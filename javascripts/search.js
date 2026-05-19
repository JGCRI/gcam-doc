/**
 * Client-side full-text search for GCAM documentation.
 *
 * Fetches a Jekyll-generated JSON index of all pages on first use,
 * then performs case-insensitive substring matching with snippet previews.
 * Zero external dependencies.
 */
(function () {
  'use strict';

  var INDEX = null;          // Loaded page index
  var INDEX_LOADING = false; // Single-flight flag
  var INDEX_CALLBACKS = [];  // Queued callbacks while loading

  function $(id) { return document.getElementById(id); }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function getSearchUrl() {
    var meta = document.querySelector('meta[name="gcam-search-url"]');
    return meta ? meta.getAttribute('content') : '/search.json';
  }

  function loadIndex(cb) {
    if (INDEX) { cb(null, INDEX); return; }
    INDEX_CALLBACKS.push(cb);
    if (INDEX_LOADING) return;
    INDEX_LOADING = true;

    var url = getSearchUrl();
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      var err = null;
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          var data = JSON.parse(xhr.responseText);
          if (!Array.isArray(data)) throw new Error('search.json is not an array');
          INDEX = data.map(function (d) {
            var title = String(d.title || '');
            var content = String(d.content || '');
            return {
              title: title,
              url: String(d.url || '#'),
              content: content,
              lower: (title + ' ' + content).toLowerCase()
            };
          });
        } else {
          err = new Error('HTTP ' + xhr.status + ' loading ' + url);
        }
      } catch (e) {
        err = e;
      }
      var cbs = INDEX_CALLBACKS;
      INDEX_CALLBACKS = [];
      INDEX_LOADING = false;
      for (var i = 0; i < cbs.length; i++) cbs[i](err, INDEX);
    };
    xhr.send();
  }

  function makeSnippet(text, pos, query) {
    var start = Math.max(0, pos - 40);
    var end = Math.min(text.length, pos + query.length + 100);
    var s = text.slice(start, end).replace(/\s+/g, ' ').trim();
    var lower = s.toLowerCase();
    var qLower = query.toLowerCase();
    var out = '';
    var i = 0, j;
    while ((j = lower.indexOf(qLower, i)) !== -1) {
      out += escapeHtml(s.slice(i, j));
      out += '<mark>' + escapeHtml(s.slice(j, j + qLower.length)) + '</mark>';
      i = j + qLower.length;
    }
    out += escapeHtml(s.slice(i));
    if (start > 0) out = '&hellip; ' + out;
    if (end < text.length) out += ' &hellip;';
    return out;
  }

  function renderResults(overlay, resultsList, query, hits) {
    overlay.hidden = false;
    overlay.removeAttribute('hidden');
    overlay.style.display = 'block';

    if (!hits || hits.length === 0) {
      resultsList.innerHTML =
        '<li class="gcam-search-empty">No results for "' + escapeHtml(query) + '"</li>';
      return;
    }
    var html = '';
    var q = encodeURIComponent(query);
    for (var i = 0; i < hits.length; i++) {
      var h = hits[i];
      var snip = h.contentPos >= 0
        ? makeSnippet(h.page.content, h.contentPos, query) : '';
      // Append ?q=... so the landing page can scroll to and highlight the match
      var hrefBase = h.page.url;
      var sep = hrefBase.indexOf('?') === -1 ? '?' : '&';
      var href = hrefBase + sep + 'q=' + q;
      // Extract version from URL path (e.g. /gcam-doc/v3.2/foo.html -> v3.2).
      // Current-version pages have no version subdirectory, so no badge.
      var verMatch = h.page.url.match(/\/(v\d+(?:\.\d+)?)\//);
      var verBadge = verMatch
        ? ' <span class="gcam-search-version">' + escapeHtml(verMatch[1]) + '</span>'
        : '';
      html += '<li><a href="' + escapeHtml(href) + '">'
        + '<div class="gcam-search-title">' + escapeHtml(h.page.title)
        + verBadge
        + ' <span class="gcam-search-count">' + h.count + '</span></div>'
        + (snip ? '<div class="gcam-search-snippet">' + snip + '</div>' : '')
        + '</a></li>';
    }
    resultsList.innerHTML = html;
  }

  function runSearch(query, overlay, resultsList) {
    query = (query || '').trim();
    if (!query) {
      overlay.hidden = true;
      overlay.style.display = 'none';
      resultsList.innerHTML = '';
      return;
    }

    // Show loading state immediately
    overlay.hidden = false;
    overlay.removeAttribute('hidden');
    overlay.style.display = 'block';
    resultsList.innerHTML =
      '<li class="gcam-search-empty">Loading&hellip;</li>';

    loadIndex(function (err, index) {
      if (err) {
        resultsList.innerHTML =
          '<li class="gcam-search-empty">Search index failed to load: '
          + escapeHtml(err.message) + '</li>';
        return;
      }
      var qLower = query.toLowerCase();
      var hits = [];
      for (var i = 0; i < index.length; i++) {
        var page = index[i];
        if (page.lower.indexOf(qLower) === -1) continue;
        var count = 0, idx = 0;
        while ((idx = page.lower.indexOf(qLower, idx)) !== -1) {
          count++; idx += qLower.length;
          if (count > 200) break;
        }
        hits.push({
          page: page,
          count: count,
          contentPos: page.content.toLowerCase().indexOf(qLower)
        });
      }
      // Sort: current-version pages first (no /vX.Y/ in URL), then archived;
      // within each group, more matches first.
      var archivedRe = /\/v\d+(?:\.\d+)?\//;
      hits.sort(function (a, b) {
        var aArch = archivedRe.test(a.page.url) ? 1 : 0;
        var bArch = archivedRe.test(b.page.url) ? 1 : 0;
        if (aArch !== bArch) return aArch - bArch;
        return b.count - a.count;
      });
      renderResults(overlay, resultsList, query, hits);
    });
  }

  // ---- Highlight the search term within the current page (?q=...) ----

  function getQueryParam(name) {
    var pairs = (location.search || '').replace(/^\?/, '').split('&');
    for (var i = 0; i < pairs.length; i++) {
      var kv = pairs[i].split('=');
      if (decodeURIComponent(kv[0] || '') === name) {
        return decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
      }
    }
    return '';
  }

  function highlightOnPage(query) {
    if (!query) return;
    var root = document.querySelector('.wrapper section') || document.body;
    if (!root) return;

    var qLower = query.toLowerCase();
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.parentNode) return NodeFilter.FILTER_REJECT;
        var tag = n.parentNode.nodeName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'MARK') {
          return NodeFilter.FILTER_REJECT;
        }
        // Skip the search box itself
        if (n.parentNode.closest && n.parentNode.closest('.gcam-search-box')) {
          return NodeFilter.FILTER_REJECT;
        }
        return n.nodeValue.toLowerCase().indexOf(qLower) === -1
          ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });

    var matched = [];
    var node;
    while ((node = walker.nextNode())) {
      matched.push(node);
      if (matched.length > 500) break; // safety cap
    }

    var firstMark = null;
    for (var i = 0; i < matched.length; i++) {
      var n = matched[i];
      var text = n.nodeValue;
      var lower = text.toLowerCase();
      var frag = document.createDocumentFragment();
      var idx = 0, j;
      while ((j = lower.indexOf(qLower, idx)) !== -1) {
        if (j > idx) frag.appendChild(document.createTextNode(text.slice(idx, j)));
        var mark = document.createElement('mark');
        mark.className = 'gcam-page-highlight';
        mark.textContent = text.slice(j, j + query.length);
        if (!firstMark) {
          mark.classList.add('gcam-page-highlight-first');
          firstMark = mark;
        }
        frag.appendChild(mark);
        idx = j + query.length;
      }
      if (idx < text.length) frag.appendChild(document.createTextNode(text.slice(idx)));
      n.parentNode.replaceChild(frag, n);
    }

    if (firstMark) {
      setTimeout(function () {
        firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  function init() {
    var pageQuery = getQueryParam('q');
    if (pageQuery) highlightOnPage(pageQuery);

    var input = $('gcam-search-input');
    var button = $('gcam-search-button');
    var overlay = $('gcam-search-overlay');
    var resultsList = $('gcam-search-results');
    if (!input || !overlay || !resultsList) return;

    // Pre-fill the search box with the query that brought us here
    if (pageQuery && !input.value) input.value = pageQuery;

    var debounceTimer;
    function go() { runSearch(input.value, overlay, resultsList); }

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(go, 200);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(debounceTimer);
        go();
      } else if (e.key === 'Escape') {
        input.value = '';
        overlay.hidden = true;
        overlay.style.display = 'none';
        resultsList.innerHTML = '';
      }
    });

    if (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        clearTimeout(debounceTimer);
        go();
      });
    }

    // Close overlay when clicking outside the search box.
    // Use the search-box wrapper so clicks anywhere inside (input, button,
    // results) keep it open.
    var box = input.closest('.gcam-search-box');
    document.addEventListener('click', function (e) {
      if (box && !box.contains(e.target)) {
        overlay.hidden = true;
        overlay.style.display = 'none';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

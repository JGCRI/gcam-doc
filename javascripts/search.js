/**
 * Client-side full-text search for GCAM documentation.
 *
 * On first use, fetches search.json (built by Jekyll at build time) and indexes
 * all pages.  Searches are simple case-insensitive substring matches — fast
 * enough for the ~40-page corpus and zero external dependencies.
 */
(function () {
  'use strict';

  var index = null;       // Array of { title, url, content, lower }
  var overlay = null;     // DOM: results overlay
  var resultsList = null; // DOM: <ul> inside overlay
  var input = null;       // DOM: search <input>
  var button = null;      // DOM: search <button>
  var timer = null;

  // ---- Bootstrap ----

  function init() {
    input = document.getElementById('gcam-search-input');
    button = document.getElementById('gcam-search-button');
    overlay = document.getElementById('gcam-search-overlay');
    resultsList = document.getElementById('gcam-search-results');
    if (!input || !overlay || !resultsList) return;

    // Live search as you type
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { runSearch(input.value.trim()); }, 200);
    });

    // Enter key triggers search immediately
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(timer);
        runSearch(input.value.trim());
      } else if (e.key === 'Escape') {
        input.value = '';
        hideOverlay();
      }
    });

    // Click on the Search button
    if (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        runSearch(input.value.trim());
      });
    }

    // Close overlay when clicking outside the search box
    document.addEventListener('click', function (e) {
      if (!overlay.contains(e.target) && e.target !== input && e.target !== button) {
        hideOverlay();
      }
    });
  }

  // ---- Index loading ----

  function loadIndex(cb) {
    if (index) return cb();
    var meta = document.querySelector('meta[name="gcam-search-url"]');
    var url = meta ? meta.getAttribute('content') : '/search.json';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          var data = JSON.parse(xhr.responseText);
          index = data.map(function (d) {
            return {
              title: d.title,
              url: d.url,
              content: d.content,
              lower: (d.title + ' ' + d.content).toLowerCase()
            };
          });
        } catch (e) {
          index = [];
        }
      } else {
        index = [];
      }
      cb();
    };
    xhr.onerror = function () { index = []; cb(); };
    xhr.send();
  }

  // ---- Search ----

  function runSearch(query) {
    if (!query) { hideOverlay(); return; }

    loadIndex(function () {
      var qLower = query.toLowerCase();
      var hits = [];

      for (var i = 0; i < index.length; i++) {
        var page = index[i];
        var pos = page.lower.indexOf(qLower);
        if (pos === -1) continue;

        // Count matches
        var count = 0;
        var idx = 0;
        while ((idx = page.lower.indexOf(qLower, idx)) !== -1) {
          count++;
          idx += qLower.length;
          if (count > 100) break;
        }

        // Find position in content (skip title prefix)
        var contentPos = page.content.toLowerCase().indexOf(qLower);

        hits.push({ page: page, count: count, contentPos: contentPos });
      }

      if (hits.length === 0) {
        showOverlay();
        resultsList.innerHTML = '<li class="gcam-search-empty">No results for "' + escapeHtml(query) + '"</li>';
        return;
      }

      // Sort: more matches first
      hits.sort(function (a, b) { return b.count - a.count; });

      var html = '';
      for (var j = 0; j < hits.length; j++) {
        var h = hits[j];
        var snip = h.contentPos >= 0
          ? makeSnippet(h.page.content, h.contentPos, query)
          : '';
        html += '<li><a href="' + escapeHtml(h.page.url) + '">'
          + '<div class="gcam-search-title">' + escapeHtml(h.page.title)
          + ' <span class="gcam-search-count">' + h.count + '</span></div>'
          + (snip ? '<div class="gcam-search-snippet">' + snip + '</div>' : '')
          + '</a></li>';
      }
      showOverlay();
      resultsList.innerHTML = html;
    });
  }

  // ---- Helpers ----

  function makeSnippet(text, pos, query) {
    var start = Math.max(0, pos - 40);
    var end = Math.min(text.length, pos + query.length + 80);
    var s = text.slice(start, end).replace(/\s+/g, ' ').trim();

    // Highlight all occurrences of query in snippet
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

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function showOverlay() { overlay.hidden = false; }
  function hideOverlay() { overlay.hidden = true; resultsList.innerHTML = ''; }

  // ---- Go ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

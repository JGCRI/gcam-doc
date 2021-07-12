var queryURL = "https://raw.githubusercontent.com/JGCRI/gcam-core/master/output/queries/Main_queries.xml";
var queryDoc = null;
function updateText(id, queryText) {
    document.getElementById(id).textContent = queryText;
}
function findQuery(queryName) {
    var results = queryDoc.evaluate('//*[@title="'+queryName+'"]', queryDoc, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    var resultsAsXML = results.iterateNext();
    var returnText;
    if(resultsAsXML === null) {
        returnText = "Could not find query "+queryName+" in "+queryURL;
    }
    else {
        var s = new XMLSerializer();
        returnText = s.serializeToString(resultsAsXML);
        if(results.iterateNext() != null) {
            log.warning("Found more than one occurrence of "+queryName+ " in "+queryURL);
        }
    }
    return returnText;
}
function getQuery(id, queryName) {
    if(queryDoc === null) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            // note sure why we can't request as "document" directly
            // instead I am doing text and parsing manually
            //queryDoc = xhr.responseXML.documentElement;
            var queryDocAsText = xhr.responseText;
            let domparser = new DOMParser();
            queryDoc = domparser.parseFromString(queryDocAsText, "text/xml");
            updateText(id, findQuery(queryName));
        }
        xhr.onerror = function() {
            updateText(id, "Could not load query file from "+queryURL);
        }
        xhr.open("GET", queryURL);
        // note sure why we can't request as "document" directly
        // so just get the text
        xhr.responseType = "text";
        xhr.send();
    } else {
        updateText(id, findQuery(queryName));
    }
}

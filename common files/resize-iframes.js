var iframeFunctionAttached = false;

function resizeIframes(selector) {
    if (typeof selector === "string") { var postCollection = document.querySelectorAll(selector); } else { var postCollection = selector; }
    
    function hasClass(element, desiredClass) { return (new RegExp("^" + desiredClass + " ").test(element.className) || new RegExp(" " + desiredClass + "$").test(element.className) || new RegExp(" " + desiredClass + " ").test(element.className) || new RegExp("^" + desiredClass + "$").test(element.className)); }
    
    function actuallyResizeIframes() {
        var processedIframes = document.getElementsByClassName("iframe_resizer");
        for (j = 0; j < processedIframes.length; j++) {
            if (!hasClass(processedIframes[j], "tumblr_audio_player") && !hasClass(processedIframes[j], "instagram-media")) {
                var iframeWidth = processedIframes[j].getAttribute("width");
                var iframeFinalWidth = processedIframes[j].parentNode.clientWidth;
                if (hasClass(processedIframes[j], "spotify_audio_player")) { processedIframes[j].setAttribute("height", iframeFinalWidth + 80); } else { processedIframes[j].setAttribute("height", processedIframes[j].getAttribute("height") * (iframeFinalWidth / iframeWidth)); }
                processedIframes[j].setAttribute("width", iframeFinalWidth);
            }
        }
    }

    for (i = 0; i < postCollection.length; i++) {
        var iframes = postCollection[i].querySelectorAll(".tmblr-full iframe");
        if (iframes.length > 0) {
            for (j = 0; j < iframes.length; j++) { iframes[j].className += " iframe_resizer"; }
            actuallyResizeIframes();
            if (iframeFunctionAttached === false) { window.addEventListener("resize", actuallyResizeIframes, false); } iframeFunctionAttached = true;
        }
    }
}

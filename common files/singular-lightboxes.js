function singularLightbox(selector) {
    function addLightbox() {
        if (event.type === "click" || (event.type === "keypress" && (event.key === "Enter" || event.which === 13))) {
            var photo = this;
            if (!photo.getAttribute("data-highres")) {
                var orgSrc = photo.src.slice(0, photo.src.lastIndexOf("."));
                if (orgSrc.lastIndexOf("_") !== -1) {
                    orgSrc = orgSrc.slice(0, (orgSrc.lastIndexOf("_") + 1));
                    var imgFormat = photo.src.slice(photo.src.lastIndexOf("."));
                    highres = orgSrc + 1280 + imgFormat;
                } else { highres = photo.src; }
                photo.setAttribute("data-highres", highres);
            }
            
            Tumblr.Lightbox.init([{ 
                "width": photo.getAttribute("data-orig-width"),
                "height": photo.getAttribute("data-orig-height"),
                "low_res": photo.src,
                "high_res": photo.getAttribute("data-highres")
            }], 1);
        }
    }
    
    if (typeof selector === "string") { var posts = document.querySelectorAll(selector); } else { var posts = selector; }
    var figures = [];
    for (i = 0; i < posts.length; i++) {
        var figure = posts[i].querySelectorAll("*:not(." + npfOptions.generatedPhotosetContainerClass + "):not(." + npfOptions.rowClass + ") > figure:not(.tmblr-panorama) img");
        if (figure.length > 0) { for (j = 0; j < figure.length; j++) { figures.push(figure[j]); } }
    }
    
    for (i = 0; i < figures.length; i++) {
        figures[i].setAttribute("tabindex", "0");
        figures[i].addEventListener("click", addLightbox, false);
        figures[i].addEventListener("keypress", addLightbox, false);
    }
}

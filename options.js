{
    const list = document.getElementById("saved-urls");
    var urls = "";
    chrome.storage.local.get('scroll-mark', function (result) {
        urls = result["scroll-mark"];
        for (var url in urls) {
            var div = document.createElement("div");
            div.innerHTML = "<a href=" + url + ">" + url + "</a>" + "<p>" + urls[url] + "</p>";
            list.appendChild(div);
        }
    });

}


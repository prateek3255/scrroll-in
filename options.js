{
    const list = document.getElementById("saved-urls");
    var urls = "";
    var i = 0;
    chrome.storage.local.get("scroll-mark", function(result) {
        urls = result["scroll-mark"];
        for (var url in urls) {
            i++;
            var div = document.createElement("div");
            div.innerHTML = "<a href=" + url + " target='_blank' class='links' title="+url+">" + i + ") " + url.substring(0,20) + "..." + "</a>";
            list.appendChild(div);
        }
    });
    var optbtn = document.getElementById("optbtn");
    var container = document.getElementById("contain");
    optbtn.onclick = function() {
        container.classList.toggle("hide");
    };
}

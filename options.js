{
    const list = document.getElementById("saved-urls");
    let urls = "";
    let i = 0;
    chrome.storage.local.get("scroll-mark", function(result) {
        urls = result["scroll-mark"];
        for (let url in urls) {
            i++;
            let div = document.createElement("div");
            div.innerHTML = "<a href=" + url + " class='links' title="+url+">" + i + ") " + url + "..." + "</a>";
            list.appendChild(div);
        }
    });
}
// document scrolling behaviours
{
    window.onscroll = function() {
        let heading = document.getElementById("heading");
        if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
            heading.className = "scrolled";
        } else {
            heading.className = "";
        }
    };
    document.getElementById("pageup").onclick = function() {
        window.scrollTo({top: 0, behavior: "smooth"});
    };
    
}
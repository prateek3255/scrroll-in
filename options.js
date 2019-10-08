{
<<<<<<< HEAD
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
=======
  const list = document.getElementById("saved-urls");
  var urls = "";
  chrome.storage.local.get("scroll-mark", function(result) {
    urls = result["scroll-mark"];
    for (var url in urls) {
      let title = urls[url].title || url;
      var div = document.createElement("div");
      let percentage = Math.round((urls[url].offset / urls[url].total) * 100);
      if (percentage)
        div.innerHTML =
          "<a href=" + url + ">" + title + "</a> " + percentage + "%";
      else div.innerHTML = "<a href=" + url + ">" + title + "</a>";
      list.appendChild(div);
    }
  });
>>>>>>> devfolioco/master
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
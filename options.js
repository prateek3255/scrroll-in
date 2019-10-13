{
  const list = document.getElementById("saved-urls");
  var urls = "";
<<<<<<< HEAD
  let i = 0;
  chrome.storage.local.get("scroll-mark", function(result) {
=======
  chrome.storage.local.get("scroll-mark", function (result) {
>>>>>>> devfolioco/master
    urls = result["scroll-mark"];
    for (var url in urls) {
        i++
      let title = urls[url].title || url;
      var div = document.createElement("div");
      let percentage = Math.round((urls[url].offset / urls[url].total) * 100);
      if (percentage)
        div.innerHTML =
<<<<<<< HEAD
          "<a href=" + url + " class='links' title="+url+">"+ i + ") " + title + 
            "<span class='percent'><div id='progress'><div id='bar' style='width: "+percentage+"%'></div></div>" + percentage + "%" +"</span></a> ";
=======
          "<a href=" + url + ">" + title + "</a> " + "<div class='perc'>" + percentage + "</div>";
>>>>>>> devfolioco/master
      else div.innerHTML = "<a href=" + url + ">" + title + "</a>";
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
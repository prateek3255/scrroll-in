{
  const list = document.getElementById("saved-urls");
  var urls = "";
  chrome.storage.local.get("scroll-mark", function (result) {
    urls = result["scroll-mark"];
    for (var url in urls) {
      let title = urls[url].title || url;
      var div = document.createElement("div");
      div.setAttribute("data-date", urls[url].date ? urls[url].date.slice(0, 15) : "Date-Here"); // add date here when the url was saved.
      let percentage = Math.round((urls[url].offset / urls[url].total) * 100);
      if (percentage)
        div.innerHTML =
          "<a href=" + url + ">" + title + "</a> " + "<div class='perc'>" + percentage + "</div>";
      else div.innerHTML = "<a href=" + url + ">" + title + "</a>";
      list.appendChild(div);
    }
  });
}

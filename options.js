{
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
}

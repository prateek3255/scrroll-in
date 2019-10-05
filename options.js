{
  const list = document.getElementById("saved-urls");
  var urls = "";
  chrome.storage.local.get("scroll-mark", function(result) {
    urls = result["scroll-mark"];
    for (var url in urls) {
      var div = document.createElement("div");
      let percentage = Math.round((urls[url].offset / urls[url].total) * 100);
      if (percentage)
        div.innerHTML =
          "<a href=" + url + ">" + url + "</a> (" + percentage + "%)";
      else div.innerHTML = "<a href=" + url + ">" + url + "</a>";
      list.appendChild(div);
    }
  });
}

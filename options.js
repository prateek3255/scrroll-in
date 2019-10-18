{
  const list = document.getElementById("saved-urls");
  var urls = "";
  chrome.storage.local.get("scroll-mark", function (result) {
    urls = result["scroll-mark"];
    if (urls) {
      urls_array = [];
      for (url in urls) {
        urls_array.push({ ...urls[url], url: url })
      }
      urls_array.sort(function (a, b) {
        return new Date(b.added_date) - new Date(a.added_date);
      });
    }
    for (var index = 0; index < urls_array.length; ++index) {
      url = urls_array[index];
      let title = url.title || url.url;
      var div = document.createElement("div");
      let percentage = Math.round((url.offset / url.total) * 100);
      if (percentage)
        div.innerHTML =
          "<a href=" + url.url + ">" + title + "</a> " + "<div class='perc'>" + percentage + "</div>";
      else div.innerHTML = "<a href=" + url.url + ">" + title + "</a>";
      list.appendChild(div);
    }
  });
}

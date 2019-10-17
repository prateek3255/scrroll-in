{
  const list = document.getElementById("saved-urls");
  const clearAllBtn = document.getElementById('clear-all-btn');
  var urls = "";
  chrome.storage.local.get("scroll-mark", function (result) {
    urls = result["scroll-mark"];
    if(Object.keys(urls).length > 0) {
      clearAllBtn.style.display = 'inline-block';
    }
    for (var url in urls) {
      let title = urls[url].title || url;
      var div = document.createElement("div");
      let percentage = Math.round((urls[url].offset / urls[url].total) * 100);
      if (percentage)
        div.innerHTML =
          "<a href=" + url + ">" + title + "</a> " + "<div class='perc'>" + percentage + "</div>";
      else div.innerHTML = "<a href=" + url + ">" + title + "</a>";
      list.appendChild(div);
    }
  });  
  clearAllBtn.addEventListener('click', () => {
    if(confirm("Are you sure you want to clear everything?")) {
      chrome.storage.local.set({ "scroll-mark": {} }, (data) => {
        list.innerHTML = "";
        clearAllBtn.style.display = 'none';
      });
    }
  });
}

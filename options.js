{
  const list = document.getElementById("saved-urls");
  let urls = "";
  chrome.storage.local.get("scroll-mark")
    .then(result => {
      urls = result["scroll-mark"];
      for (let url in urls) {
        let title = urls[url].title || url;
        let div = document.createElement("div");
        let percentage = Math.round((urls[url].offset / urls[url].total) * 100);
        if (percentage) {
          div.innerHTML =
            "<a href=" + url + ">" + title + "</a> " + "<div class='perc'>" + percentage + "</div>";
        }
        else {
          div.innerHTML = "<a href=" + url + ">" + title + "</a>";
        }
        list.appendChild(div);
      }
    })
    .catch(err => console.log(err));
}

{
  const list = document.getElementById("saved-urls");

  chrome.storage.local.get("scroll-mark", function (result) {
    let urls = result["scroll-mark"];

    // if no saved scrolls are available
    if (Object.entries(urls).length === 0 && urls.constructor === Object) {
      let heading = document.getElementById("saved-scroll-heading");
      heading.innerHTML = "<h1 id='saved-scroll-heading'>Empty!!!</h1>";
    }
    else {

      let heading = document.getElementById("saved-scroll-heading");
      heading.innerHTML = "<h1 id='saved-scroll-heading'>All Saved Scrrolls</h1>";

      var btn = document.createElement("div");
      btn.innerHTML = `
      <div id="mybutton">
        <button class="btn red" style="width:100%;" id="delete-all">Delete All</button>
      </div>
      `;
      document.body.appendChild(btn);

      for (var url in urls) {
        let title = urls[url].title || url;
        let url_id = url;
        var div = document.createElement("div");
        let percentage = Math.round((urls[url].offset / urls[url].total) * 100);

        let delete_html = `
        <div style="margin-left:25px">
        <div style="display:flex; width:285 px; margin-top:5px">
        <button class="btn red ScrollElement" style="width:100%;" id="${url_id}">Delete</button>
        </div>
        <div>
        `

        if (percentage)
          div.innerHTML =
            "<a href=" + url + ">" + title + "</a> " + "<div class='perc'>" + percentage + "</div>" + delete_html;
        else div.innerHTML = "<a href=" + url + ">" + title + "</a>" + delete_html;

        list.appendChild(div);
      }
    }

    let scrollElements = document.getElementsByClassName("ScrollElement");
    let deleteAllBtn = document.getElementById("delete-all");

    // TODO: use the delete.js script instead
    // but that would require some modifications to the original delete functionality
    let deleteScrollElement = function (element) {
      if (confirm("Are you sure you want to remove this saved scroll?")) {
        const { [this.id]: _, ...restData } = urls;
        chrome.storage.local.set({ "scroll-mark": restData }, () => {
          chrome.runtime.sendMessage("setInactive");
        });
        window.location.reload();
      }
    };

    let deleteAllScrollElement = function (element) {
      if (confirm("Are you sure you want to remove all saved scrolls?")) {
        chrome.storage.local.set({ "scroll-mark": {} }, (data) => {
        });
        window.location.reload();
      }
    };

    for (let i = 0; i < scrollElements.length; i++) {
      scrollElements[i].addEventListener('click', deleteScrollElement, false);
    }

    deleteAllBtn.addEventListener('click', deleteAllScrollElement, false);

  });
}

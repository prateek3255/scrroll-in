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
        div.setAttribute('class', 'Scroll');
        let percentage = Math.round((urls[url].offset / urls[url].total) * 100);

        let delete_html = `
        <div class="dropdown" id="${url_id}_|_">
          <div id="${url_id}_|" class="dropdown-content">
                <button class="ScrollElement" id="${url_id}">Delete</button>
          </div>
        </div>
        `;

        if (percentage)
          div.innerHTML =
            "<a href=" + url + ">" + title + "</a> " + "<div class='perc'>" + percentage + "</div>" + delete_html;
        else div.innerHTML = "<a href=" + url + ">" + title + "</a> " + "<div class='perc'>" + 0 + "</div>" + delete_html;

        list.appendChild(div);
      }
    }

    // function to open dropdown menu
    let showDropdown = function (e) {
      let drop_id = this.id.substring(0, this.id.length - 1);
      document.getElementById(drop_id).classList.toggle("show_dropdown");
    }

    // function to close dropdown menu
    let closeDropdown = function () {
      let drop_id = this.id.substring(0, this.id.length - 1);
      document.getElementById(drop_id).classList.toggle("show_dropdown");
    }

    // all dropdown menus
    let dotElements = document.getElementsByClassName("dropdown");

    for (let i = 0; i < dotElements.length; i++) {
      dotElements[i].addEventListener('mouseover', showDropdown, false);
      dotElements[i].addEventListener("mouseout", closeDropdown);
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

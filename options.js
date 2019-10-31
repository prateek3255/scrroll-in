{
  const list = document.getElementById("saved-urls");

  chrome.storage.local.get("scroll-mark", function(result) {
    const urls = result["scroll-mark"];

    // if no saved scrolls are available
    const heading = document.getElementById("saved-scroll-heading");
    if (Object.entries(urls).length === 0 && urls.constructor === Object) {
      heading.innerHTML =
        "<h1 id='saved-scroll-heading'>You don't have any saved scrrolls yet!</h1>";
    } else {
      heading.innerHTML =
        "<h1 id='saved-scroll-heading'>All Saved Scrolls</h1>";

      const btn = document.createElement("div");
      btn.innerHTML = `
      <div id="delete-button">
        <div class="btn red" id="delete-all">Delete All</div>
      </div>
      `;
      document.body.appendChild(btn);

      for (var url in urls) {
        const title = urls[url].title || url;
        const url_id = url;
        const div = document.createElement("div");
        div.setAttribute("class", "Scroll");
        div.setAttribute(
          "data-date",
          urls[url].date ? urls[url].date.slice(0, 15) : "Date-Here"
        );
        const percentage = Math.round(
          (urls[url].offset / urls[url].total) * 100
        );

        const delete_html = `
        <div class="dropdown" id="${url_id}_|_">
          <div id="${url_id}_|" class="dropdown-content">
                <button class="ScrollElement" id="${url_id}">Delete</button>
          </div>
        </div>
        `;

        if (percentage)
          div.innerHTML =
            "<a href=" +
            url +
            ">" +
            title +
            "</a> " +
            "<div class='perc'>" +
            percentage +
            "</div>" +
            delete_html;
        else
          div.innerHTML =
            "<a href=" +
            url +
            ">" +
            title +
            "</a> " +
            "<div class='perc'>" +
            0 +
            "</div>" +
            delete_html;

        list.appendChild(div);
      }
    }

    // function to open dropdown menu
    const showDropdown = function(e) {
      const drop_id = this.id.substring(0, this.id.length - 1);
      document.getElementById(drop_id).classList.toggle("show_dropdown");
    };

    // function to close dropdown menu
    const closeDropdown = function(e) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      if (e.target.className !== "dropdown") {
        for (let i = 0; i < dropdowns.length; i++) {
          dropdowns[i].classList.remove("show_dropdown");
        }
      }
    };

    // all dropdown menus
    const dotElements = document.getElementsByClassName("dropdown");

    for (let i = 0; i < dotElements.length; i++) {
      dotElements[i].addEventListener("click", showDropdown, false);
    }

    const containers = document.getElementsByClassName("container");
    containers[0].addEventListener("click", closeDropdown);

    const scrollElements = document.getElementsByClassName("ScrollElement");
    const deleteAllBtn = document.getElementById("delete-all");

    // TODO: use the delete.js script instead
    // but that would require some modifications to the original delete functionality
    const deleteScrollElement = function(element) {
      if (confirm("Are you sure you want to remove this saved scroll?")) {
        const { [this.id]: _, ...restData } = urls;
        chrome.storage.local.set({ "scroll-mark": restData }, () => {
          chrome.runtime.sendMessage("setInactive");
        });
        window.location.reload();
      }
    };

    const deleteAllScrollElement = function(element) {
      if (confirm("Are you sure you want to remove all saved scrolls?")) {
        chrome.storage.local.set({ "scroll-mark": {} }, data => {});
        window.location.reload();
      }
    };

    for (let i = 0; i < scrollElements.length; i++) {
      scrollElements[i].addEventListener("click", deleteScrollElement, false);
    }

    deleteAllBtn.addEventListener("click", deleteAllScrollElement, false);
  });
}

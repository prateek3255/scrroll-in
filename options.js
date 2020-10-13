{
  const list = document.getElementById("saved-urls");

  chrome.storage.local.get("scroll-mark", function (result) {
    const urls = result["scroll-mark"];
    let delay = 0.3;
    // if no saved scrolls are available
    const heading = document.getElementById("saved-scroll-heading");
    if (Object.entries(urls).length === 0 && urls.constructor === Object) {
      heading.innerHTML =
        "<h1 id='saved-scroll-heading'>You don't have any saved scrrolls yet!</h1>";
      heading.parentElement.style.height = "100vh";
    } else {
      heading.innerHTML =
        "<h1 id='saved-scroll-heading'>All Saved Scrrolls</h1>";

      const btn = document.createElement("div");
      btn.innerHTML = `
      <div id="delete-button">
        <div class="btn del" id="delete-all"> <img src='./images/bin.png'> </div>
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
            " target='_blank'>" +
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
            " target='_blank'>" +
            title +
            "</a> " +
            "<div class='perc'>" +
            0 +
            "</div>" +
            delete_html;
        div.style.animationDelay = (delay += 0.1) + "s";
        list.appendChild(div);
      }
    }

    // function to open dropdown menu
    const showDropdown = function (e) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("show_dropdown");
      }
      const drop_id = this.id.substring(0, this.id.length - 1);
      document.getElementById(drop_id).classList.toggle("show_dropdown");
    };

    // function to close dropdown menu
    const closeDropdown = function (e) {
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
    const deleteScrollElement = function (element) {
      Swal.fire({
        title: "Are you sure?",
        text: "This scrroll would be removed from your collection.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          const { [this.id]: _, ...restData } = urls;
          chrome.storage.local.set({ "scroll-mark": restData }, () => {
            chrome.runtime.sendMessage("setInactive");
          });
          let x = document.querySelector(`a[href = "${this.id}"]`);
          x.parentElement.parentElement.removeChild(x.parentElement);
          // window.location.reload();
        }
      });
    };

    const deleteAllScrollElement = function (element) {
      Swal.fire({
        title: "Remove all Scrrolls?",
        text: "This action is not reversible!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete All"
      }).then(result => {
        if (result.value) {
          chrome.storage.local.set({ "scroll-mark": {} }, data => { });
          window.location.reload();
        }
      });
    };

    for (let i = 0; i < scrollElements.length; i++) {
      scrollElements[i].addEventListener("click", deleteScrollElement, false);
    }
    if (deleteAllBtn) {
      deleteAllBtn.addEventListener("click", deleteAllScrollElement, false);
    }
  });
}

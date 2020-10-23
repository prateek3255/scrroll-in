{
  const list = document.getElementById("saved-urls");

  chrome.storage.local.get("scroll-mark", function (result) {
    const urls = result["scroll-mark"];
    console.log(urls);
    let delay = 0.3;
    var listUrls = [];
    var j = 0;
    // if no saved scrolls are available
    const heading = document.getElementById("saved-scroll-heading");
    if (Object.entries(urls).length === 0 && urls.constructor === Object) {
      heading.innerHTML =
        "<h1 id='saved-scroll-heading'>You don't have any saved scrrolls yet!</h1>";
      heading.parentElement.style.height = "100vh";
    } else {
      heading.innerHTML =
        "<h1 id='saved-scroll-heading'>All Saved Scrrolls</h1>";
      const search = document.createElement("p");

      const btn = document.createElement("div");
      search.innerHTML = "<p><input type='text' name='Search' placeholder='Search' id='searchtxt'/><button id='searchbtn'>Search </button></p>";

      btn.innerHTML = `
      <div id="delete-button" data-filter="true">
        <div class="btn del" id="delete-all"> <img src='./images/bin.png'> </div>
      </div>
      `;
      const btn2 = document.createElement("button");
      btn2.innerHTML = "<button class='btn primary' id='sort-button'>Sort by Date </button>";
      list.appendChild(search);

      document.body.appendChild(btn);
      var i2 = 0;
      document.body.appendChild(btn2);
      for (var url in urls) {
        const title = urls[url].title || url;
        listUrls[i2] = url;
        i2 = i2 + 1;
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
      j = i2;
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
    const sortbutton = document.getElementById('sort-button');
    const searchbtn = document.getElementById('searchbtn');
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

    const searchvalue = function (e) {

      var string1 = document.getElementById("searchtxt").value;
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }

      //var listUrls = [];
      j = 0;
      for (var url in urls) {
        title = urls[url].title;
        console.log("title=", title);
        var re = new RegExp(string1, 'gi');
        //console.log(`/${string1}/g`);
        var res = title.match(re);
        if (res !== null) {
          listUrls[j] = url;
          j = j + 1;
        }
        console.log(res);
      }
      console.log("llist", listUrls);
      for (var i = 0; i < j; i++) {
        const url = listUrls[i];
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

        const delete_html1 = `
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
            delete_html1;
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
            delete_html1;
        div.style.animationDelay = (delay += 0.1) + "s";
        list.appendChild(div);
      }
      const showDropdown1 = function (e) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
          dropdowns[i].classList.remove("show_dropdown");
        }
        const drop_id = this.id.substring(0, this.id.length - 1);
        document.getElementById(drop_id).classList.toggle("show_dropdown");
      };

      // function to close dropdown menu
      const closeDropdown1 = function (e) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        if (e.target.className !== "dropdown") {
          for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove("show_dropdown");
          }
        }
      };
      const dotElements1 = document.getElementsByClassName("dropdown");

      for (let i = 0; i < dotElements1.length; i++) {
        dotElements1[i].addEventListener("click", showDropdown1, false);
      }

      const containers1 = document.getElementsByClassName("container");
      containers1[0].addEventListener("click", closeDropdown1);

      const scrollElements1 = document.getElementsByClassName("ScrollElement");
      const deleteAllBtn1 = document.getElementById("delete-all");
      const sortbutton = document.getElementById('sort-button');
      const searchbtn = document.getElementById('searchbtn');
      for (let i = 0; i < scrollElements1.length; i++) {
        scrollElements1[i].addEventListener("click", deleteScrollElement, false);
      }
      if (deleteAllBtn1) {
        deleteAllBtn1.addEventListener("click", deleteAllScrollElement, false);
      }
      if (sortbutton) {
        sortbutton.addEventListener("click", sortbydate, false);
      }
      if (searchbtn) {
        searchbtn.addEventListener("click", searchvalue, false);
      }


      //console.log(listUrls);
      //alert(string1);
    }
    const sortbydate = function (e) {
      //console.log("list=", list);

      while (list.firstChild) {
        list.removeChild(list.firstChild);
      }
      //console.log("list=", list);
      //alert("sort by date");
      var obj = [];
      i = 0;
      console.log(listUrls);
      for (var i3 = 0; i3 < j; i3++) {
        //console.log(url);
        url = listUrls[i3];
        obj[i] = urls[url];
        obj[i].url = url;
        i = i + 1;
        //console.log(urls[url]);
      }

      obj.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(a.date) - new Date(b.date);
      });
      //console.log("obj", obj);
      //var listUrls = [];
      //console.log(listUrls);

      //const urls2 = new Object();
      for (var i1 = 0; i1 < obj.length;) {
        listUrls[i1] = obj[i1].url;
        i1 = i1 + 1;
        //console.log("urls=", obj[i].url);
        //urls2[obj[i].url] = obj[i];
      }
      //console.log(listUrls);

      for (var i = 0; i < i1; i++) {
        const url = listUrls[i];
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

        const delete_html1 = `
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
            delete_html1;
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
            delete_html1;
        div.style.animationDelay = (delay += 0.1) + "s";
        list.appendChild(div);
      }
      //console.log("finallist", list);
      const showDropdown1 = function (e) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
          dropdowns[i].classList.remove("show_dropdown");
        }
        const drop_id = this.id.substring(0, this.id.length - 1);
        document.getElementById(drop_id).classList.toggle("show_dropdown");
      };

      // function to close dropdown menu
      const closeDropdown1 = function (e) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        if (e.target.className !== "dropdown") {
          for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove("show_dropdown");
          }
        }
      };
      const dotElements1 = document.getElementsByClassName("dropdown");

      for (let i = 0; i < dotElements1.length; i++) {
        dotElements1[i].addEventListener("click", showDropdown1, false);
      }

      const containers1 = document.getElementsByClassName("container");
      containers1[0].addEventListener("click", closeDropdown1);

      const scrollElements1 = document.getElementsByClassName("ScrollElement");
      const deleteAllBtn1 = document.getElementById("delete-all");
      const sortbutton = document.getElementById('sort-button');
      const searchbtn = document.getElementById('searchbtn');
      for (let i = 0; i < scrollElements1.length; i++) {
        scrollElements1[i].addEventListener("click", deleteScrollElement, false);
      }
      if (deleteAllBtn1) {
        deleteAllBtn1.addEventListener("click", deleteAllScrollElement, false);
      }
      if (sortbutton) {
        sortbutton.addEventListener("click", sortbydate, false);
      }
      if (searchbtn) {
        searchbtn.addEventListener("click", searchvalue, false);
      }
    }

    for (let i = 0; i < scrollElements.length; i++) {
      scrollElements[i].addEventListener("click", deleteScrollElement, false);
    }
    if (deleteAllBtn) {
      deleteAllBtn.addEventListener("click", deleteAllScrollElement, false);
    }
    if (sortbutton) {
      sortbutton.addEventListener("click", sortbydate, false);
    }
    if (searchbtn) {
      searchbtn.addEventListener("click", searchvalue, false);
    }
  });
}

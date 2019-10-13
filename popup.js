const root = document.getElementById("root");
root.innerHTML = "<div> Loading...</div>";

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const fullUrl = tabs[0].url;

  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    if (scrollMarkData && scrollMarkData.hasOwnProperty(url)) {
      document.getElementById("message").innerHTML =
        "Continue from where you last left or update/delete scrroll for this page.";
      document.getElementById(
        "activeContol"
      ).innerHTML = `<img src="./images/icon-32.png" />`;
      root.innerHTML = `
      <button class="btn" id="getScroll">Scrroll to </button>
      <button class="btn orange" id="saveScroll">Update</button>
      <button class="btn red" id="deleteScroll">Delete</button>
      `;
      let deleteScroll = document.getElementById("deleteScroll");

      deleteScroll.onclick = function(element) {
        chrome.tabs.executeScript(tabs[0].id, {
          file: "delete.js",
          allFrames: true
        });
        window.close();
      };

      let getScroll = document.getElementById("getScroll");

      getScroll.onclick = function(element) {
        chrome.tabs.executeScript(tabs[0].id, {
          file: "get.js",
          allFrames: true
        });
        window.close();
      };
    } else {
      root.innerHTML = `<button class="btn" id="saveScroll">Save</button>`;
      document.getElementById("message").innerHTML =
        "In a hurry! Save the scrroll and read this page at your own pace by clicking the button below👇";
      document.getElementById("activeContol").innerHTML = `<img src="./images/icon-32-inactive.png" />`;
      root.innerHTML = ` <button style="width:100px; " class="btn" id="saveScroll">Save</button>`;
    }
    let saveScroll = document.getElementById("saveScroll");

    saveScroll.onclick = function(element) {
      chrome.tabs.executeScript(tabs[0].id, {
        file: "save.js",
        allFrames: true
      });
      window.close();
    };
  });
});

// Recents

{
    let list = document.getElementById("saved-urls");
    var urls = "";
    let i = 0;
    var sorted = new Array;
    console.log();
    chrome.storage.local.get("scroll-mark", function(result) {
        urls = result["scroll-mark"];
        for (var url in urls) {
            i++;
            let title = urls[url].title || url;
            var div = document.createElement("div");
            div.innerHTML = "<a href=" + url + " target='_blank' class='links' title="+url+">" + title.substring(0,20) + "..." + "</a>";
            sorted.push(div);
        }
        sorted.reverse();
        for (i=0;i<5;i++) {
            list.appendChild(sorted[i]);
        }
    });
    
    // Slider
    
    var optbtn = document.getElementById("optbtn");
    var container = document.getElementById("contain");
    optbtn.onclick = function() {
        container.classList.toggle("hide");
    };
}

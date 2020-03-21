import {
  executeSaveScroll,
  executeGetScroll,
  executeDeleteScroll
} from "./helpers.js";

const root = document.getElementById("root");
root.innerHTML = "<div> Loading...</div>";

window.addEventListener("click", function(e) {
  if (e.target.href !== undefined) {
    chrome.tabs.create({ url: e.target.href });
    chrome.storage.local.set({ "scroll-mark-shortcut-tip": true });
  }
});

chrome.storage.local.get("scroll-mark-shortcut-tip", data => {
  if (!data["scroll-mark-shortcut-tip"]) {
    const tip = document.getElementById("tip");
    tip.innerHTML = `💡Tip : Add keyboard shortcuts
    <a href="chrome://extensions/shortcuts" target="_blank">here</a> to save,
    fetch or delete scrrolls without having to open the extension popup.`;
  }
});

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
        executeDeleteScroll(tabs[0].id);
        window.close();
      };

      let getScroll = document.getElementById("getScroll");

      getScroll.onclick = function(element) {
        executeGetScroll(tabs[0].id);
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
      executeSaveScroll(tabs[0].id);
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

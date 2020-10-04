import {
  executeSaveScroll,
  executeGetScroll,
  executeDeleteScroll,
  executeAddScroll,
  fullName
} from "./helpers.js";
//import { fullName } from './add.js';
const root = document.getElementById("root");
root.innerHTML = "<div> Loading...</div>";

window.addEventListener("click", function (e) {
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
      <div style="margin-top:25px">
      <div style="margin-bottom:10px;display:flex;justify-content:center;width:100%;">
      <button id="getScroll" style="width:100%;" class="btn">Fetch Scroll</button>
      </div>
      <div style="display:flex; width:285 px; margin-top:-5px">
      <button class="btn orange" style="width:100%;margin-right:10px" id="saveScroll">Update</button>
      <button class="btn red" style="width:100%;" id="deleteScroll">Delete</button>
      </div>
      <div id="addScroll"><p style="font-size:16px; cursor:pointer; color:white">Add More scrolls</p></div>
      <div id="getId">
          ${Object.keys(scrollMarkData[url]).map((v, i) => {
          return `<p id="${i}" style="font-size: 12px;color:white;cursor:pointer">${v}</p>`
        }).join('')}
      </div>
      <div>`



      let addScroll = document.getElementById("addScroll");
      addScroll.onclick = function (element) {
        const full = fullName();

        executeAddScroll(tabs[0].id)

      }

      var df = document.getElementById("getId")
      df.addEventListener('click', function (e) {
        e.target.style.color = 'blue';
        //alert(e.target.innerHTML)

        //.addEventListener('click', function (e) {
        //alert(e.target.innerHTML)


        chrome.storage.local.set({
          "get-multiple-scroll": e.target.innerHTML
        })
      });



      let deleteScroll = document.getElementById("deleteScroll");

      deleteScroll.onclick = function (element) {
        executeDeleteScroll(tabs[0].id);
        window.close();
      };

      let getScroll = document.getElementById("getScroll");

      getScroll.onclick = function (element) {
        executeGetScroll(tabs[0].id);
        window.close();
      };
    } else {
      document.getElementById("message").innerHTML =
        "In a hurry! Save the scrroll and read this page at your own pace by clicking the button below👇";
      document.getElementById(
        "activeContol"
      ).innerHTML = `<img src="./images/icon-32-inactive.png" />`;
      root.innerHTML = ` <button style="width:100px; " class="btn" id="saveScroll">Save</button>`;
    }
    let saveScroll = document.getElementById("saveScroll");

    saveScroll.onclick = function (element) {
      executeSaveScroll(tabs[0].id);
      window.close();
    };
  });
});

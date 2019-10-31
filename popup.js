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
      <div style="margin-top:25px">
      <div style="margin-bottom:10px;display:flex;justify-content:center;width:100%;">
      <button id="getScroll" style="width:100%;" class="btn">Fetch Scroll</button>
      </div>
      <div style="display:flex; width:285 px; margin-top:-5px">
      <button class="btn orange" style="width:100%;margin-right:10px" id="saveScroll">Update</button>
      <button class="btn red" style="width:100%;" id="deleteScroll">Delete</button>
      </div>
      <div>
      `;
      let deleteScroll = document.getElementById("deleteScroll");

      deleteScroll.onclick = function(element) {
        chrome.tabs.executeScript(tabs[0].id, {
          file: "delete.js",
        });
        window.close();
      };

      let getScroll = document.getElementById("getScroll");

      getScroll.onclick = function(element) {
        chrome.tabs.executeScript(tabs[0].id, {
          file: "get.js",
        });
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

    saveScroll.onclick = function(element) {
      chrome.tabs.executeScript(tabs[0].id, {
        file: "save.js",
      });
      window.close();
    };
  });
});

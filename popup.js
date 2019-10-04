const root = document.getElementById("root");
root.innerHTML = "<div> Loading...</div>";

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const url = tabs[0].url;
  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    if (scrollMarkData && scrollMarkData.hasOwnProperty(url)) {
      root.innerHTML = `
      <div style="margin:15px;">
      <div style="margin-bottom:10px;display:flex;justify-content:center;width:100%;">
      <button id="getScroll" style="width:100%;" class="btn">Fetch Scroll</button>
      </div>
      <div style="display:flex; width:200px;">
      <button class="btn orange" style="width:100%;margin-right:10px" id="saveScroll">Update</button>
      <button class="btn red" style="width:100%;" id="deleteScroll">Delete</button>
      </div>
      <div>
      `;
      let deleteScroll = document.getElementById("deleteScroll");

      deleteScroll.onclick = function (element) {
        chrome.tabs.executeScript(tabs[0].id, {
          file: "delete.js",
          allFrames: true
        });
        window.close();
      };

      let getScroll = document.getElementById("getScroll");

      getScroll.onclick = function (element) {
        chrome.tabs.executeScript(tabs[0].id, {
          file: "get.js",
          allFrames: true
        });
        window.close();
      };
    } else {
      root.innerHTML = `<button style="width:100px; margin:15px" class="btn" id="saveScroll">Save</button>`;
    }
    let saveScroll = document.getElementById("saveScroll");

    saveScroll.onclick = function (element) {
      chrome.tabs.executeScript(tabs[0].id, {
        file: "save.js",
        allFrames: true
      });
      window.close();
    };
  });
});

const root = document.getElementById("root");
root.innerHTML = "<div> Loading...</div>";

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const url = tabs[0].url;
  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    if (scrollMarkData && scrollMarkData.hasOwnProperty(url)) {
      root.innerHTML = `
      <button class="btn" id="getScroll">Fetch Scroll</button>
      <button class="btn orange" id="saveScroll">Update</button>
      <button class="btn red" id="deleteScroll">Delete</button>
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
      root.innerHTML = `<button class="btn" id="saveScroll">Save</button>`;
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

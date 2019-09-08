const root = document.getElementById("root");
root.innerHTML = "<div> Loading...</div>";

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const url = tabs[0].url;
  chrome.storage.sync.get(url, data => {
    if (data.hasOwnProperty(url)) {
      console.log(data);
      root.innerHTML = `
      <button id="getScroll">Go to last saved postion</button>
      <button id="saveScroll">Update scroll</button>
      <button id="deleteScroll">Delete scroll data</button>
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
      root.innerHTML = `<button id="saveScroll">Save scroll</button>`;
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

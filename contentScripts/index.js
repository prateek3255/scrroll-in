export const executeScript = (tabId, fileName) => {
  chrome.scripting.executeScript({
    target: { tabId },
    files: [fileName],
  });
};

export const executeSaveScroll = (tabId) => {
  executeScript(tabId, "contentScripts/save.js");
};

export const executeDeleteScroll = (tabId) => {
  executeScript(tabId, "contentScripts/delete.js");
};

export const executeGetScroll = (tabId) => {
  executeScript(tabId, "contentScripts/get.js");
};

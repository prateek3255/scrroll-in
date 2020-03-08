export const executeScript = (tabId, fileName) => {
  chrome.tabs.executeScript(tabId, {
    file: fileName
  });
};

export const executeSaveScroll = tabId => {
  executeScript(tabId, "save.js");
};

export const executeDeleteScroll = tabId => {
  executeScript(tabId, "delete.js");
};

export const executeGetScroll = tabId => {
  executeScript(tabId, "get.js");
};

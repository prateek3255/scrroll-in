export const executeScript = (tabId, file) => {
  chrome.scripting.executeScript({
    target: { tabId },
    files: [file],
  });
};

export const MAX_SCROLLS = 20;

export const getURL = () => {
  const fullUrl = window.location.href;
  return fullUrl.split('?')[0];
};

export const getItemFromStorage = name =>
  new Promise(resolve => {
    chrome.storage.local.get(name, data => {
      resolve(data);
    });
  });

export const executeSaveScroll = tabId => {
  executeScript(tabId, 'contentScripts/save.js');
};

export const executeDeleteScroll = (tabId, scrollId, clearAll = false) => {
  chrome.storage.local.set({ 'current-scroll-id': scrollId, 'clear-all': clearAll });
  executeScript(tabId, 'contentScripts/delete.js');
};

export const executeGetScroll = (tabId, scrollId, fetchLatestItem = false) => {
  chrome.storage.local.set({ 'current-scroll-id': scrollId, 'fetch-latest-item': fetchLatestItem });
  executeScript(tabId, 'contentScripts/get.js');
};

export const executeUpdateScroll = (tabId, scrollId) => {
  chrome.storage.local.set({ 'current-scroll-id': scrollId });
  executeScript(tabId, 'contentScripts/update.js');
};

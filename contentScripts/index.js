export const executeScript = (tabId, file) => {
  chrome.scripting.executeScript({
    target: { tabId },
    files: [file],
  });
};

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

export const getLatestScrollItem = url =>
  new Promise(resolve => {
    getItemFromStorage('scroll-mark').then(data => {
      const urlData = data['scroll-mark'][url];

      if (Array.isArray(urlData) && urlData.length > 0) {
        const itemWithMaximumOffset = urlData.reduce(
          (prev, current) => (prev.offset > current.offset ? prev : current),
          { offset: 0 }
        );
        resolve(itemWithMaximumOffset);
      } else if (urlData && urlData.offset) {
        resolve(urlData);
      } else {
        resolve(null);
      }
    });
  });

export const executeSaveScroll = tabId => {
  executeScript(tabId, 'contentScripts/save.js');
};

export const executeDeleteScroll = (tabId, scrollId) => {
  chrome.storage.local.set({ 'current-scroll-id': scrollId });
  executeScript(tabId, 'contentScripts/delete.js');
};

export const executeGetScroll = (tabId, scrollId) => {
  chrome.storage.local.set({ 'current-scroll-id': scrollId });
  executeScript(tabId, 'contentScripts/get.js');
};

export const executeUpdateScroll = (tabId, scrollId) => {
  chrome.storage.local.set({ 'current-scroll-id': scrollId });
  executeScript(tabId, 'contentScripts/update.js');
};

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

export const showToast = async (content, color) => {
  const shouldShowToast = (await getItemFromStorage('show-toast-notification'))['show-toast-notification'];

  if (!shouldShowToast) {
    return;
  }

  const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" preserveAspectRatio="xMidYMid meet" viewBox="76.35 55.28 100.15 138.72" style="height:25px; margin-right:14px;"><g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)" fill="#4F80FF" stroke="none"><path d="M902 2000 c-54 -11 -96 -41 -115 -82 -19 -43 -32 -658 -17 -788 41 -338 209 -510 500 -510 247 0 398 121 472 375 22 78 23 91 23 497 0 405 -1 417 -21 445 -11 15 -38 37 -60 48 -37 19 -61 20 -389 22 -192 1 -369 -3 -393 -7z m416 -248 c8 -11 12 -55 12 -136 0 -131 -9 -156 -58 -156 -53 0 -62 22 -62 154 0 67 4 126 8 132 23 34 75 38 100 6z"></path></g></svg>`;
  document.body.innerHTML += `<div id="scrroll-in-snackbar" class="${color}">${svgIcon} ${content}</div>`;

  const x = document.getElementById('scrroll-in-snackbar');
  x.className += ' show';
  setTimeout(() => {
    x.className = x.className.replace('show', '');
    // Wait for animation to complete before removing from dom
    setTimeout(() => {
      x.remove();
    }, 600);
  }, 3000);
};

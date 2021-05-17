import { getURL, getItemFromStorage } from './index';

(async function () {
  const url = getURL();

  const data = await getItemFromStorage('scroll-mark');
  const scrollMarkData = data['scroll-mark'];
  const urlData = scrollMarkData[url];

  let updatedURLData;

  if (Array.isArray(urlData)) {
    const currentScrollData = await getItemFromStorage('current-scroll-id');
    const id = currentScrollData['current-scroll-id'];

    updatedURLData = urlData.filter(item => item.uuid !== id);

    if (updatedURLData.length === 0) {
      updatedURLData = undefined;
    }
  }

  if (scrollMarkData[url]) {
    const updatedData = { ...scrollMarkData, [url]: updatedURLData };
    chrome.storage.local.set({ 'scroll-mark': updatedData }, () => {
      if (updatedURLData === undefined) {
        chrome.runtime.sendMessage('setInactive');
      }
    });
  }
})();

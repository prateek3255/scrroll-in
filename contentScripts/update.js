import { v4 as uuidv4 } from 'uuid';
import { getURL, getItemFromStorage } from './index';

(async function () {
  const url = getURL();

  const data = await getItemFromStorage('scroll-mark');
  const scrollMarkData = data['scroll-mark'];
  const offset = window.pageYOffset;
  const urlData = scrollMarkData[url];
  const date = String(new Date());
  let items = [];

  if (Array.isArray(urlData)) {
    items = urlData;
    // A fallback mechanism to support the data structure for older version
    // will be removed with next major release
  } else if (urlData && typeof urlData.title === 'string') {
    items = [{ ...urlData, scrollName: 'Untitled Scrroll', uuid: uuidv4(), offset, date }];
  }

  const currentScrollData = await getItemFromStorage('current-scroll-id');
  const id = currentScrollData['current-scroll-id'];

  items = items.map(currentItem => {
    if (currentItem.uuid === id) {
      return {
        ...currentItem,
        offset,
        date,
      };
    }
    return currentItem;
  });

  const newData = { ...scrollMarkData, [url]: items };
  chrome.storage.local.set({ 'scroll-mark': newData }, () => {
    chrome.runtime.sendMessage('setActive');
  });
})();

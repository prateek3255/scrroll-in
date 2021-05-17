import { v4 as uuidv4 } from 'uuid';
import { getURL } from './index';

const url = getURL();

chrome.storage.local.get('scroll-mark', data => {
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
    items = [{ ...urlData, scrollName: 'Untitled Scrroll', uuid: uuidv4() }];
  }

  chrome.storage.local.get('current-scroll-id', currentScrollData => {
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
  });

  const newData = { ...scrollMarkData, [url]: items };
  chrome.storage.local.set({ 'scroll-mark': newData }, () => {
    chrome.runtime.sendMessage('setActive');
  });
});

import { v4 as uuidv4 } from 'uuid';
import { getURL } from './index';

const url = getURL();

chrome.storage.local.get('scroll-mark', data => {
  const scrollMarkData = data['scroll-mark'];
  const offset = window.pageYOffset;
  const total = document.body.scrollHeight;
  const { title } = document;
  const urlData = scrollMarkData[url];
  const date = String(new Date());
  const uuid = uuidv4();
  let items = [];

  if (Array.isArray(urlData)) {
    items = urlData;
    // A fallback mechanism to support the data structure for older version
    // will be removed with next major release
  } else if (urlData && typeof urlData.title === 'string') {
    items = [{ ...urlData, scrollName: 'Untitled Scrroll', uuid: uuidv4() }];
  }

  let scrollName = prompt(
    'Enter the name of the Scrroll (This can help you identify a particular scrroll if you save multiple scrrolls on this page)'
  );

  if (!scrollName) {
    return;
  }

  if (scrollName.trim().length === 0) {
    scrollName = 'Untitled Scrroll';
  }

  const updatedURLData = [
    ...items,
    {
      offset,
      total,
      title,
      date,
      scrollName,
      uuid,
    },
  ];

  const newData = scrollMarkData ? { ...scrollMarkData, [url]: updatedURLData } : { [url]: updatedURLData };
  chrome.storage.local.set({ 'scroll-mark': newData }, () => {
    chrome.runtime.sendMessage('setActive');
  });
});

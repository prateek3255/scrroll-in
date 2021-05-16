import { v4 as uuidv4 } from 'uuid';

export const executeScript = (tabId, func) => {
  chrome.scripting.executeScript({
    target: { tabId },
    function: func,
  });
};

function getURL() {
  const fullUrl = window.location.href;
  return fullUrl.split('?')[0];
}

function saveScroll() {
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
      items = [{ ...urlData, scrollName: 'Untitled Scrroll' }];
    }

    let scrollName = prompt(
      'Enter the name of the Scrroll (This can help you identify a particular scrroll if you save multiple scrrolls on this page)'
    );

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
}

function deleteScroll() {
  const url = getURL();

  chrome.storage.local.get('scroll-mark', data => {
    const scrollMarkData = data['scroll-mark'];
    const urlData = scrollMarkData[url];

    let updatedURLData;

    if (Array.isArray(urlData)) {
      chrome.storage.local.get('current-scroll-id', currentScrollData => {
        const id = currentScrollData['current-scroll-id'];

        updatedURLData = urlData.filter(item => item.uuid !== id);

        if (updatedURLData.length === 0) {
          updatedURLData = undefined;
        }
      });
    }

    if (scrollMarkData[url]) {
      const updatedData = { ...scrollMarkData, [url]: updatedURLData };
      chrome.storage.local.set({ 'scroll-mark': updatedData }, () => {
        if (updatedURLData === undefined) {
          chrome.runtime.sendMessage('setInactive');
        }
      });
    }
  });
}

function getScroll() {
  const url = getURL();

  chrome.storage.local.get('scroll-mark', data => {
    const scrollMarkData = data['scroll-mark'];
    let offset = null;
    const urlData = scrollMarkData[url];

    if (typeof urlData.offset === 'number') {
      offset = urlData.offset;
    } else if (Array.isArray(urlData)) {
      chrome.storage.local.get('current-scroll-id', currentScrollData => {
        const id = currentScrollData['current-scroll-id'];
        const item = urlData.find(currentItem => currentItem.id === id);

        if (item) {
          offset = item.offset;
        }
      });
    }

    if (offset) {
      window.scrollTo({ left: 0, top: offset, behavior: 'smooth' });
    }
  });
}

export const executeSaveScroll = tabId => {
  executeScript(tabId, saveScroll);
};

export const executeDeleteScroll = (tabId, scrollId) => {
  chrome.storage.local.set({ 'current-scroll-id': scrollId });
  executeScript(tabId, deleteScroll);
};

export const executeGetScroll = (tabId, scrollId) => {
  chrome.storage.local.set({ 'current-scroll-id': scrollId });
  executeScript(tabId, getScroll);
};

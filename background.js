chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ "scroll-mark": {} });
});

const updateIcon = () => {
  console.log("updated");
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const url = tabs[0].url;
    chrome.storage.local.get("scroll-mark", data => {
      const scrollMarkData = data["scroll-mark"];
      if (!scrollMarkData.hasOwnProperty(url)) {
        setInactiveIcon();
      } else {
        setActiveIcon();
      }
    });
  });
};

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const url = tabs[0].url;
    chrome.storage.local.get("scroll-mark", data => {
      const scrollMarkData = data["scroll-mark"];
      if (!scrollMarkData.hasOwnProperty(url)) {
        setInactiveIcon();
      } else {
        setActiveIcon();
      }
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, updateObj) => {
  chrome.tabs.get(tabId, tab => {
    const url = tab.url;
    if (url) {
      chrome.storage.local.get("scroll-mark", data => {
        const scrollMarkData = data["scroll-mark"];
        if (!scrollMarkData.hasOwnProperty(url)) {
          setInactiveIcon();
        } else {
          setActiveIcon();
        }
      });
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request === "setActive") {
    setActiveIcon();
  } else {
    setInactiveIcon();
  }
});

const setActiveIcon = () => {
  chrome.browserAction.setIcon({
    path: {
      "16": "images/favicon-16x16.png",
      "32": "images/favicon-32x32.png",
      "96": "images/favicon-192x192.png",
      "256": "images/favicon-384x384.png"
    }
  });
};

const setInactiveIcon = () => {
  chrome.browserAction.setIcon({
    path: {
      "16": "images/favicon-inactive-16x16.png",
      "32": "images/favicon-inactive-32x32.png",
      "96": "images/favicon-inactive-192x192.png",
      "256": "images/favicon-inactive-384x384.png"
    }
  });
};

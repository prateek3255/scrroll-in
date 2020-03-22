import {
  executeSaveScroll,
  executeGetScroll,
  executeDeleteScroll
} from "./helpers.js";

function getUrlWithoutHash(url) {
  return url.split("?")[0];
}

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === "install") {
    chrome.storage.local.set({ "scroll-mark": {} });
  }
});

const updateIcon = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const url = getUrlWithoutHash(tabs[0].url);

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
    const url = getUrlWithoutHash(tabs[0].url);

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
    const url = getUrlWithoutHash(tab.url);

    if (url) {
      chrome.storage.local.get("scroll-mark", data => {
        const scrollMarkData = data["scroll-mark"];
        if (!scrollMarkData.hasOwnProperty(url)) {
          setInactiveIcon();
        } else {
          executeGetScroll(tabId);
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

chrome.commands.onCommand.addListener(function(command) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const currentTabId = tabs[0].id;
    if (command === "save-or-update-scroll") {
      executeSaveScroll(currentTabId);
    } else if (command === "delete-scroll") {
      executeDeleteScroll(currentTabId);
    } else if (command === "fetch-scroll") {
      executeGetScroll(currentTabId);
    }
  });
});

const setActiveIcon = () => {
  chrome.browserAction.setIcon({
    path: {
      "16": "images/icon-16.png",
      "32": "images/icon-32.png",
      "48": "images/icon-48.png",
      "128": "images/icon-128.png",
      "256": "images/icon-256.png"
    }
  });
};

const setInactiveIcon = () => {
  chrome.browserAction.setIcon({
    path: {
      "16": "images/icon-16-inactive.png",
      "32": "images/icon-32-inactive.png",
      "48": "images/icon-48-inactive.png",
      "128": "images/icon-128-inactive.png",
      "256": "images/icon-256-inactive.png"
    }
  });
};

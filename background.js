chrome.tabs.onActivated.addListener(() => {
  console.log("changed");
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const url = tabs[0].url;
    chrome.storage.sync.get(url, data => {
      console.log("here");
      if (!data.hasOwnProperty(url)) {
        setInactiveIcon();
      } else {
        setActiveIcon();
      }
    });
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

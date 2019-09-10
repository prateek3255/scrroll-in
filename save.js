{
  const url = window.location.href;
  chrome.storage.sync.set({ [url]: window.pageYOffset }, () => {
    chrome.runtime.sendMessage("setActive");
  });
}

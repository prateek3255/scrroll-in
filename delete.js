{
  const url = window.location.href;
  chrome.storage.sync.remove(url);
  chrome.runtime.sendMessage("setInactive");
}

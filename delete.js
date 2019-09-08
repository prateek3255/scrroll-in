{
  const url = window.location.href;
  chrome.storage.sync.remove(url);
}

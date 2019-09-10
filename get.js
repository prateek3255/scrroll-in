{
  const url = window.location.href;
  chrome.storage.sync.get(url, data => {
    window.scrollTo(0, data[url]);
  });
}

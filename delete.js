{
  const url = window.location.href;
  chrome.storage.sync.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const { [url]: _, ...restData } = scrollMarkData;
    chrome.storage.sync.set({ "scroll-mark": restData }, () => {
      chrome.runtime.sendMessage("setInactive");
    });
  });
}

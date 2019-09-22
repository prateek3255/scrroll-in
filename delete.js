{
  const url = window.location.href;
  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const { [url]: _, ...restData } = scrollMarkData;
    chrome.storage.local.set({ "scroll-mark": restData }, () => {
      chrome.runtime.sendMessage("setInactive");
    });
  });
}

{
  const url = window.location.href;
  chrome.storage.sync.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const offset = window.pageYOffset;
    const newData = scrollMarkData
      ? { ...scrollMarkData, [url]: offset }
      : { [url]: offset };
    console.log(offset, scrollMarkData[url], newData[url]);
    chrome.storage.sync.set({ "scroll-mark": newData }, () => {
      chrome.runtime.sendMessage("setActive");
    });
  });
}

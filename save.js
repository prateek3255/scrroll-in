{
  const url = window.location.href;
  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const offset = window.pageYOffset;
    const total = document.body.clientHeight;
    const newData = scrollMarkData
      ? { ...scrollMarkData, [url]: { offset, total } }
      : { [url]: { offset, total } };
    console.log(offset, scrollMarkData[url], newData[url]);
    chrome.storage.local.set({ "scroll-mark": newData }, () => {
      chrome.runtime.sendMessage("setActive");
    });
  });
}

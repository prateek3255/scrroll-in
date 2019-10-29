{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const title = document.title;
    let date = String(new Date());
    console.log(document.title);
    const newData = scrollMarkData
      ? { ...scrollMarkData, [url]: { offset, total, title, date } }
      : { [url]: { offset, total, title, date } };
    console.log(offset, scrollMarkData[url], newData[url]);
    chrome.storage.local.set({ "scroll-mark": newData }, () => {
      chrome.runtime.sendMessage("setActive");
    });
  });
}

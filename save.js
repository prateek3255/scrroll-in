{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const title = document.title;
    const added_date = (new Date()).getTime();
    console.log(document.title);
    const newData = scrollMarkData
      ? { ...scrollMarkData, [url]: { offset, total, title, added_date } }
      : { [url]: { offset, total, title, added_date } };
    console.log(offset, scrollMarkData[url], newData[url]);
    chrome.storage.local.set({ "scroll-mark": newData }, () => {
      chrome.runtime.sendMessage("setActive");
    });
  });
}
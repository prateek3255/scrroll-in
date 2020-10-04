{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const s = data["scroll-mark"];
    const s1 = Object.keys(s)
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const title = document.title;

    const scrollId = prompt();
    let date = String(new Date());
    console.log(scrollMarkData);
    const newData = scrollMarkData
      ? { ...scrollMarkData, [url]: { [scrollId]: { offset, total, title, date } } }
      : { [url]: { [scrollId]: { offset, total, title, date } } };
    chrome.storage.local.set({ "scroll-mark": newData }, () => {
      chrome.runtime.sendMessage("setActive");
    });
  });
}

{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];
  var note = prompt("Enter the context:");
  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const title = document.title;
    let date = String(new Date());
    const newData = scrollMarkData
      ? { ...scrollMarkData, [url]: { offset, total, title, date, note } }
      : { [url]: { offset, total, title, date, note } };
    chrome.storage.local.set({ "scroll-mark": newData }, () => {
      chrome.runtime.sendMessage("setActive");
    });
  });
}

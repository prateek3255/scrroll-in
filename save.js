{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const title = document.title;
    let date = new Date;
    let adate = String(date).split(' ');
    let sdate = `${adate[0]} ${adate[2]} ${adate[1]} ${adate[3]}`;
    console.log(document.title);
    const newData = scrollMarkData
      ? { ...scrollMarkData, [url]: { offset, total, title, sdate } }
      : { [url]: { offset, total, title, sdate } };
    console.log(offset, scrollMarkData[url], newData[url]);
    chrome.storage.local.set({ "scroll-mark": newData }, () => {
      chrome.runtime.sendMessage("setActive");
    });
  });
}

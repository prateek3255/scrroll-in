{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const id = scrollMarkData[url]?.length ? scrollMarkData.length : (scrollMarkData ? 1 : 0);
    const offset = window.pageYOffset;
    const total = document.body.scrollHeight;
    const title = document.title;
    const date = String(new Date());
    let arr = [];
    if (scrollMarkData[url] && !scrollMarkData[url] instanceof Array) {
      //If there is an object, convert it into array and push that old object as well as new object into the array.

      arr.push({ ...scrollMarkData[url], id: 0 });
      arr.push({ id, offset, total, title, date });
      console.log(1);
      console.log(arr);
    } else {
      arr = scrollMarkData[url] ? scrollMarkData[url] : [];
      arr.push({ id, offset, total, title, date });
      console.log(2);
      console.log(arr);
    }
    console.log(arr);
    const newData = scrollMarkData ? { ...scrollMarkData, [url]: arr } : { [url]: arr };

    console.log("newdata");
    console.log(newData);
    chrome.storage.local.set({ "scroll-mark": newData }, () => {
      chrome.runtime.sendMessage("setActive");
    });
  });
}

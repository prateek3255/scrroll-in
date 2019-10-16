{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark")
    .then(data => {
      const scrollMarkData = data["scroll-mark"];
      const { [url]: _, ...restData } = scrollMarkData;
      chrome.storage.local.set({ "scroll-mark": restData })
        .then(() => {
          chrome.runtime.sendMessage("setInactive");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

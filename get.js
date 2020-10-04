{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    if (scrollMarkData[url]) {
      chrome.storage.local.get("get-multiple-scroll", result => {

        const scrollId = result["get-multiple-scroll"]
        console.log(scrollId)
        console.log(scrollMarkData[url][scrollId])
        const scrollMarkOffset =
          scrollMarkData[url][scrollId].offset || scrollMarkData[url];
        window.scrollTo({ left: 0, top: scrollMarkOffset, behavior: "smooth" });
      });
    }
  });
}

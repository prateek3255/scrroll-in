{
  const url = window.location.href;
  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    const scrollMarkOffset = scrollMarkData[url].offset;
    window.scrollTo({ left: 0, top: scrollMarkOffset, behavior: "smooth" });
  });
}

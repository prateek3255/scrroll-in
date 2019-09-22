{
  const url = window.location.href;
  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    window.scrollTo({ left: 0, top: scrollMarkData[url], behavior: "smooth" });
  });
}

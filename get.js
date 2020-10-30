{
  const fullUrl = window.location.href;
  const url = fullUrl.split("?")[0];

  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    if (scrollMarkData[url]) {
      const scrollMarkOffset =
        scrollMarkData[url].offset || scrollMarkData[url];
      window.scrollTo({ left: 0, top: scrollMarkOffset, behavior: "smooth" });
      if (document.readyState === "complete" && scrollMarkData[url].note !== undefined && scrollMarkData[url].note !== null) {
        alert("We hope you recollect from here :)\n" + scrollMarkData[url].note);
      }
    }
  });
}

{
    const fullUrl = window.location.href;
    const url = fullUrl.split("?")[0]
    chrome.storage.local.get("scroll-mark", data => {
        const scrollMarkData = data["scroll-mark"];

        const offset = window.pageYOffset;
        const total = document.body.scrollHeight;
        const title = document.title;

        const scrollId = prompt();
        let date = String(new Date());

        scrollMarkData[url][scrollId] = { offset, total, title, date }

        const newData = { ...scrollMarkData };
        chrome.storage.local.set({ "scroll-mark": newData }, () => {
            chrome.runtime.sendMessage("setActive");
        });
    })


}

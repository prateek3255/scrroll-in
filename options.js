{
	const list = document.getElementById("saved-urls");
	var urls = "";
	chrome.storage.local.get("scroll-mark", function(result) {
		urls = result["scroll-mark"];
		for (var url in urls) {
			let title = urls[url].title || url;
			let icon = "/images/icon-16.png";
			var div = document.createElement("div");
			let percentage = Math.round((urls[url].offset / urls[url].total) * 100);
			if (percentage)
				div.innerHTML = `<a href=${url}><div class='bookmark'><img src=${icon} alt='bookmark-logo'><p>${title}</p><span>${percentage}%</span></div></a>`;
			else div.innerHTML = "<a href=" + url + ">" + title + "</a>";
			list.appendChild(div);
		}
	});
}

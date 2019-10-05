{
	const list = document.getElementById("saved-urls");
	var urls = "";
	var favicon = "/images/favicon-16x16.png";
	chrome.storage.local.get("scroll-mark", function(result) {
		urls = result["scroll-mark"];
		for (var url in urls) {
			var div = document.createElement("div");
			div.innerHTML = `<a href=${url}><div class='bookmark'><img src=${favicon} alt='bookmark-logo'><p>${url}</p></div></a>`;
			list.appendChild(div);
		}
	});
}

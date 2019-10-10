const popup = document.querySelector(".pop-opt");
const p = document.querySelector(".p");
const green = document.querySelector(".green-btn");
const buttons = document.querySelector(".buttons");
const image = document.querySelector(".image");
buttons.innerHTML = "<div> Loading...</div>"; 


chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const url = tabs[0].url;
	chrome.storage.local.get("scroll-mark", (data) => {
		const scrollMarkData = data["scroll-mark"];
		if (scrollMarkData && scrollMarkData.hasOwnProperty(url)) {
			popup.height = "278px";
			image.src = "/images/icon-256.png";
			p.textContent = `Continue from where you last left or update/delete scrroll for this page.`;
			green.innerHTML = `<button id="getScroll" class="btn-font green">Fetch Scrroll</button>`;
			buttons.innerHTML = `<button class="btns" id="saveScroll">Update</button><button class="btns red" id="deleteScroll">Delete</button>`;
      
			let deleteScroll = document.getElementById("deleteScroll");

			deleteScroll.onclick = function(element) {
				chrome.tabs.executeScript(tabs[0].id, {
					file: "delete.js",
					allFrames: true
				});
				window.close();
			};

			let getScroll = document.getElementById("getScroll");
      
			getScroll.onclick = function(element) {
				chrome.tabs.executeScript(tabs[0].id, {
					file: "get.js",
					allFrames: true
				});
				window.close();
			};
		} else {
			popup.height = "224px";
			p.textContent = `In a hurry! Save the scrroll and read this page at your own pace by clicking the button below`;
			green.innerHTML = `<button id="saveScroll" class=" btn-font green">Save</button>`;
		}
		let saveScroll = document.getElementById("saveScroll");

		saveScroll.onclick = function(element) {
			chrome.tabs.executeScript(tabs[0].id, {
				file: "save.js",
				allFrames: true
			});
			window.close();
		};
	});
});

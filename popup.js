const root = document.getElementById("root");
root.innerHTML = "<div> Loading...</div>";

chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const url = tabs[0].url;
  chrome.storage.local.get("scroll-mark", data => {
    const scrollMarkData = data["scroll-mark"];
    if (scrollMarkData && scrollMarkData.hasOwnProperty(url)) {
      document.getElementById("message").innerHTML =
        "Continue from where you last left or update/delete scrroll for this page.";
      document.getElementById(
        "activeContol"
      ).innerHTML = `<img src="./images/icon-32.png" />`;
      root.innerHTML = `
<<<<<<< HEAD
      <button class="btn" id="getScroll">Go to</button>
      <button class="btn orange" id="saveScroll">Update</button>
      <button class="btn red" id="deleteScroll">Delete</button>
=======
      <div style="margin-top:25px">
      <div style="margin-bottom:10px;display:flex;justify-content:center;width:100%;">
      <button id="getScroll" style="width:100%;" class="btn">Fetch Scroll</button>
      </div>
      <div style="display:flex; width:285 px; margin-top:-5px">
      <button class="btn orange" style="width:100%;margin-right:10px" id="saveScroll">Update</button>
      <button class="btn red" style="width:100%;" id="deleteScroll">Delete</button>
      </div>
>>>>>>> devfolioco/master
      <div>
      `;
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
<<<<<<< HEAD
      root.innerHTML = `<button class="btn" id="saveScroll">Save</button>`;
=======
      document.getElementById("message").innerHTML =
        "In a hurry! Save the scrroll and read this page at your own pace by clicking the button below👇";
      document.getElementById(
        "activeContol"
      ).innerHTML = `<img src="./images/icon-32-inactive.png" />`;
      root.innerHTML = ` <button style="width:100px; " class="btn" id="saveScroll">Save</button>`;
>>>>>>> devfolioco/master
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

// Recents

{
    let list = document.getElementById("saved-urls");
    var urls = "";
    let i = 0;
    var sorted = new Array;
    console.log();
    chrome.storage.local.get("scroll-mark", function(result) {
        urls = result["scroll-mark"];
        for (var url in urls) {
            i++;
            let title = urls[url].title || url;
            var div = document.createElement("div");
            div.innerHTML = "<a href=" + url + " target='_blank' class='links' title="+url+">" + title.substring(0,20) + "..." + "</a>";
            sorted.push(div);
        }
        sorted.reverse();
        for (i=0;i<5;i++) {
            list.appendChild(sorted[i]);
        }
    });
    
    // Slider
    
    var optbtn = document.getElementById("optbtn");
    var container = document.getElementById("contain");
    optbtn.onclick = function() {
        container.classList.toggle("hide");
    };
}

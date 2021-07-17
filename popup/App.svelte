<script>
  import { onDestroy, onMount } from "svelte";
  import {
    executeSaveScroll,
    executeGetScroll,
    executeDeleteScroll,
    executeUpdateScroll,
    MAX_SCROLLS,
  } from "../contentScripts";

  let isShortcutVisible = false;

  let currentTabID = null;

  let doesCurrentTabHasSavedScroll = false;

  let selectedScrollIndex = 0;

  let savedScrolls = [];

  let showToastNotifications = false;

  $: controlImage = doesCurrentTabHasSavedScroll
    ? "icon-32.png"
    : "icon-32-inactive.png";

  function handleLinkClick(event) {
    if (event.target.href !== undefined) {
      chrome.tabs.create({ url: event.target.href });
      chrome.storage.local.set({ "scroll-mark-shortcut-tip": true });
    }
  }

  onMount(() => {
    // Show the shortcut tip if the local storage item is absent
    chrome.storage.local.get("scroll-mark-shortcut-tip", (data) => {
      if (!data["scroll-mark-shortcut-tip"]) {
        isShortcutVisible = true;
      }
    });

    chrome.storage.local.get("show-toast-notification", (data) => {
      showToastNotifications  = !!data["show-toast-notification"];
    });

    // Check whether the current tab has a saved scrroll or not
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const fullUrl = tabs[0].url;
      const url = fullUrl.split("?")[0];
      currentTabID = tabs[0].id;

      chrome.storage.local.get("scroll-mark", (data) => {
        const scrollMarkData = data["scroll-mark"];
        doesCurrentTabHasSavedScroll =
          scrollMarkData && scrollMarkData[url] !== undefined;

        if (doesCurrentTabHasSavedScroll) {
          if (Array.isArray(scrollMarkData[url])) {
            savedScrolls = scrollMarkData[url];
            // Update the current index to the last saved scrroll for better UX
            chrome.storage.local.get("current-scroll-id", (lastSavedScroll) => {
              if (lastSavedScroll) {
                const lastSavedScrollID = lastSavedScroll["current-scroll-id"];
                const index = savedScrolls.findIndex(
                  (item) => item.uuid === lastSavedScrollID
                );
                selectedScrollIndex = index >= 0 ? index : 0;
              }
            });
          } else {
            // Fallback for handling the data structure of previous version
            savedScrolls = [
              {
                ...scrollMarkData[url],
                uuid: null,
                scrollName: "Untitled Scrroll",
              },
            ];
          }
        }
      });
    });

    window.addEventListener("click", handleLinkClick);
  });

  onDestroy(() => {
    window.removeEventListener("click", handleLinkClick);
  });

  function getCurrentScrollID() {
    return savedScrolls[selectedScrollIndex].uuid;
  }

  function deleteScroll() {
    executeDeleteScroll(currentTabID, getCurrentScrollID());
    window.close();
  }

  function getScroll() {
    executeGetScroll(currentTabID, getCurrentScrollID());
    window.close();
  }

  function saveScroll() {
    executeSaveScroll(currentTabID);
    window.close();
  }

  function updateScroll() {
    executeUpdateScroll(currentTabID, getCurrentScrollID());
    window.close();
  }

  function handleShowToastNotificationClick() {
    showToastNotifications = !showToastNotifications;
    chrome.storage.local.set({ "show-toast-notification": showToastNotifications });
  }
</script>

<div class="controls">
  <div class="activeControl">
    <img
      src={`../images/${controlImage}`}
      alt={doesCurrentTabHasSavedScroll
        ? "This tab has a saved scrroll"
        : "Save a scrroll by clicking the save button"}
    />
  </div>
  <div class="options">
    <a target="_blank" href="/options/index.html"
      ><img
        src="../images/save.png"
        alt="bookmarks"
        height="30"
        width="20"
      /></a
    >
  </div>
</div>

<div class="main">
  <div id="root">
    {#if doesCurrentTabHasSavedScroll}
      <p class="message">
        Continue from where you last left or update/delete a scrroll for this
        page.
        <br /> <br />
        Currently selected scrroll -
        <b style="font-weight: 900;"
          >{savedScrolls[selectedScrollIndex].scrollName}</b
        >
      </p>
      <div style="margin-top:25px">
        <div
          style="margin-bottom:10px;display:flex;justify-content:center;width:100%;"
        >
          <button on:click={getScroll} style="width:100%;" class="btn"
            >Fetch Scroll</button
          >
        </div>
        <div style="display:flex; width:285 px; margin-top:-5px">
          <button
            on:click={updateScroll}
            class="btn orange"
            style="width:100%;margin-right:10px">Update</button
          >
          <button on:click={deleteScroll} class="btn red" style="width:100%;"
            >Delete</button
          >
        </div>
      </div>
    {:else}
      <p class="message">
        In a hurry! Save the scrroll and read this page at your own pace by
        clicking the button below👇
      </p>
      <button on:click={saveScroll} style="width:100px;" class="btn"
        >Save</button
      >
    {/if}
  </div>
</div>

<div class="checkbox-container">
  <input on:click={handleShowToastNotificationClick} checked={showToastNotifications} id="toast-checkbox" type="checkbox" />
  <label for="toast-checkbox">Show toast notifications for every action performed with a scrroll (Experimental)</label>
</div>

{#if doesCurrentTabHasSavedScroll}
  <div>
    <h4 class="save-scroll-heading">Your saved scrrolls -</h4>

    {#each savedScrolls as savedScroll, i (savedScroll.uuid)}
      <div
        class="scroll-item {selectedScrollIndex === i
          ? 'scroll-item-blue'
          : ''}"
        on:click={() => (selectedScrollIndex = i)}
      >
        <img
          src={i === selectedScrollIndex
            ? "../images/map-pin-filled.svg"
            : "../images/map-pin.svg"}
          alt={savedScroll.scrollName}
          width="24"
          height="24"
        />
        <div style="margin-left: 8px;">{savedScroll.scrollName}</div>
      </div>
    {/each}

    {#if savedScrolls.length < MAX_SCROLLS}
      <hr style="margin-bottom: 16px;" />
      <div class="scroll-item" on:click={saveScroll}>
        <img
          src="../images/plus-circle.svg"
          alt="Add more scrrolls"
          width="24"
          height="24"
        />
        <div style="margin-left: 8px;">Add another scrroll</div>
      </div>
    {/if}
  </div>
{/if}

{#if isShortcutVisible}
  <div class="tip">
    💡Tip : Add keyboard shortcuts
    <a href="chrome://extensions/shortcuts" target="_blank">here</a> to save, fetch
    or delete scrrolls without having to open the extension popup.
  </div>
{/if}

<style>
  .btn {
    width: 100% !important;
    padding: 5px;
    height: 41px;
    border-radius: 6px;
    font-size: 20px;
    overflow: hidden;
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    border-width: 0;
    outline: none;
    margin-bottom: 0.4em;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
    background-color: #2ecc71;
    color: #ecf0f1;
    cursor: pointer;

    transition: background-color 0.3s;
  }

  .btn:hover,
  .btn:focus {
    background-color: #27ae60;
  }

  .btn:active:before {
    width: 120%;
    padding-top: 120%;

    transition: width 0.2s ease-out, padding-top 0.2s ease-out;
  }

  .message {
    margin: 3.2em 0em 1em 0.5em;
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    align-items: center;
    color: white;
  }

  .options {
    float: right;
    margin-right: 0.1em;
  }

  .activeControl {
    float: left;
  }
  .main {
    clear: both;
  }
  /* Styles, not important */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
  .btn.orange {
    background-color: #e67e22;
  }

  .btn.orange:hover,
  .btn.orange:focus {
    background-color: #d35400;
  }

  .btn.red {
    background-color: #e74c3c;
  }

  .btn.red:hover,
  .btn.red:focus {
    background-color: #c0392b;
  }

  .tip {
    text-align: center;
    color: white;
    font-size: 12px;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
  }

  a {
    color: white;
  }

  .save-scroll-heading {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: white;
    margin-bottom: 16px;
  }

  .scroll-item {
    display: flex;
    margin-bottom: 16px;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 18px;
    color: white;
    align-items: center;
    cursor: pointer;
  }

  .scroll-item-blue {
    color: #4e80ff;
  }

  .checkbox-container {
    display: flex;
    align-items: flex-start;
    margin: 12px 0px;
  }

  .checkbox-container label {
    color: white;
    font-family: "Roboto", sans-serif;
    font-size: 13px;
    margin-left: 8px;
  }
</style>

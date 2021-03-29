<script>
  import { onDestroy, onMount } from "svelte";
  import {
    executeSaveScroll,
    executeGetScroll,
    executeDeleteScroll,
  } from "../contentScripts/index.js";

  let isShortcutVisible = false;

  let currentTabID = null;

  let doesCurrentTabHasSavedScroll = false;

  $: message = doesCurrentTabHasSavedScroll
    ? "Continue from where you last left or update/delete scrroll for this page."
    : "In a hurry! Save the scrroll and read this page at your own pace by clicking the button below👇";

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

    // Check whether the current tab has a saved scrroll or not
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const fullUrl = tabs[0].url;
      const url = fullUrl.split("?")[0];
      currentTabID = tabs[0].id;

      chrome.storage.local.get("scroll-mark", (data) => {
        const scrollMarkData = data["scroll-mark"];
        doesCurrentTabHasSavedScroll =
          scrollMarkData && scrollMarkData.hasOwnProperty(url);
      });
    });

    window.addEventListener("click", handleLinkClick);
  });

  onDestroy(() => {
    window.removeEventListener("click", handleLinkClick);
  });

  function deleteScroll() {
    executeDeleteScroll(currentTabID);
    window.close();
  }

  function getScroll() {
    executeGetScroll(currentTabID);
    window.close();
  }

  function saveScroll() {
    executeSaveScroll(currentTabID);
    window.close();
  }
</script>

<div class="controls">
  <div id="activeContol">
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
  <p id="message">
    {message}
  </p>
  <div id="root">
    {#if doesCurrentTabHasSavedScroll}
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
            on:click={saveScroll}
            class="btn orange"
            style="width:100%;margin-right:10px">Update</button
          >
          <button on:click={deleteScroll} class="btn red" style="width:100%;"
            >Delete</button
          >
        </div>
      </div>
    {:else}
      <button on:click={saveScroll} style="width:100px;" class="btn"
        >Save</button
      >
    {/if}
  </div>
</div>

{#if isShortcutVisible}
  <div id="tip">
    💡Tip : Add keyboard shortcuts
    <a href="chrome://extensions/shortcuts" target="_blank">here</a> to save, fetch
    or delete scrrolls without having to open the extension popup.
  </div>
{/if}

<style>
  @font-face {
    font-family: "Roboto";
    src: url("../Roboto/Roboto-Bold.ttf") format("truetype");
  }

  .btn {
    width: 100% !important;
    padding: 5px;
    height: 41px;
    border-radius: 6px;
    font-size: 20px;
    overflow: hidden;
    font-family: "Roboto", sans-serif;
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

  #message {
    margin: 3.2em 0em 1em 0.5em;
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    align-items: center;
    color: white;
  }

  .options {
    float: right;
    margin-right: 0.1em;
  }

  #activeContol {
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

  #tip {
    text-align: center;
    color: white;
    font-size: 12px;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
  }

  a {
    color: white;
  }
</style>

const STORAGE_KEY = 'scroll-mark';

class ScrollInController {

  constructor() {
    const rootContent = "<div>Loading...</div>";
    this.getRootElement().innerHTML = rootContent;

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, this.onTabsQuery.bind(this));
  }

  getRootElement(){
    return document.getElementById('root');
  }

  getMessageElement(){
    return document.getElementById('message');
  }

  getSaveScrollElement(){
    return document.getElementById('saveScroll');
  }

  getDeleteScrollElement(){
    return document.getElementById('deleteScroll');
  }

  getGetScrollElement(){
    return document.getElementById('getScroll');
  }

  getActiveControlElement(){
    return document.getElementById('activeControl');
  }

  onTabsQuery(tabs){
    this.targetTab = tabs[0];
    this.loadView();
  }

  loadView(){
    this.getFromStorage((elem) => {
      if(elem && elem.hasOwnProperty(this.targetTab.url)){
        this.onSavedDataFound();
      } else {
        this.onSavedDataNotFound();
      }

      this.setupClickListeners();
    });
  }

  setupClickListeners(){
    this.setupSaveListener();
    this.setupDeleteListener();
    this.setupGetListener();
  }

  setupSaveListener(){
    const saveElement = this.getSaveScrollElement();
    if(saveElement){
      const saveClickEvent = this.onSaveScrollClick.bind(this);

      saveElement.removeEventListener('click', saveClickEvent);
      saveElement.addEventListener('click', saveClickEvent);
    }
  }

  setupDeleteListener(){
    const deleteElement = this.getDeleteScrollElement();
    if(deleteElement){
      const deleteClickEvent = this.onDeleteScrollClick.bind(this);

      deleteElement.removeEventListener('click', deleteClickEvent);
      deleteElement.addEventListener('click', deleteClickEvent);
    }
  }

  setupGetListener(){
    const getScrollElement = this.getGetScrollElement();
    if(getScrollElement){
      const getClickEvent = this.onGetScrollClick.bind(this);

      getScrollElement.removeEventListener('click', getClickEvent);
      getScrollElement.addEventListener('click', getClickEvent);
    }
  }

  onSavedDataFound(){
    const messageContent = "Continue from where you last left or update/delete scrroll for this page.";
    this.getMessageElement().innerHTML = messageContent;

    const controlContent =  '<img src="./images/icon-32.png" />';
    this.getActiveControlElement().innerHTML = controlContent;

    const rootContent = [
      '<div style="margin-top:25px">',
        '<div style="margin-bottom:10px;display:flex;justify-content:center;width:100%;">',
          '<button id="getScroll" style="width:100%;" class="btn">Fetch Scroll</button>',
        '</div>',
        '<div style="display:flex; width:285px; margin-top:-5px">',
          '<button class="btn orange" style="width:100%;margin-right:10px" id="saveScroll">Update</button>',
          '<button class="btn red" style="width:100%;" id="deleteScroll">Delete</button>',
        '</div>',
      '<div>',
    ].join('\n');
    this.getRootElement().innerHTML = rootContent;
  }

  onSavedDataNotFound(){
    const messageText = "In a hurry! Save the scroll and read this page at your own pace by clicking the button below👇";
    this.getMessageElement().innerHTML = messageText;

    const controlContent = '<img src="./images/icon-32-inactive.png"  alt=""/>';
    this.getActiveControlElement().innerHTML = controlContent;

    const rootContent = '<button style="width:100px;" class="btn" id="saveScroll">Save</button>';
    this.getRootElement().innerHTML = rootContent;
  }

  getFromStorage(callback){
    chrome.storage.local.get(STORAGE_KEY, (elem) => {
      if(elem[STORAGE_KEY]) {
        callback(elem[STORAGE_KEY]);
      } else {
        callback(null)
      }
    })
  }

  executeScript(tabId, scriptName, callback){
    chrome.tabs.executeScript(tabId, {
      file: scriptName,
      allFrames: false,
      runAt: 'document_idle'
    }, () => {
      if(callback) callback();
    })
  }

  onSaveScrollClick(event){
    this.executeScript(this.targetTab.id, 'save.js', () => {
      this.loadView();
      window.close();
    });
  }

  onDeleteScrollClick(event){
    this.executeScript(this.targetTab.id, 'delete.js', () => {
      this.loadView();
      window.close();
    });
  }

  onGetScrollClick(event){
    this.executeScript(this.targetTab.id, 'get.js', () => {
      this.loadView();
      window.close();
    });
  }

}
 new ScrollInController();

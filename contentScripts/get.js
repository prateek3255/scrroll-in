import { getURL, getItemFromStorage } from './index';

(async function () {
  const url = getURL();
  const data = await getItemFromStorage('scroll-mark');

  const scrollMarkData = data['scroll-mark'];
  let offset = null;
  const urlData = scrollMarkData[url];

  if (typeof urlData.offset === 'number') {
    offset = urlData.offset;
  } else if (Array.isArray(urlData)) {
    const currentScrollData = await getItemFromStorage('current-scroll-id');
    const id = currentScrollData['current-scroll-id'];
    const item = urlData.find(currentItem => currentItem.uuid === id);

    if (item) {
      offset = item.offset;
    }
  }

  if (offset) {
    window.scrollTo({ left: 0, top: offset, behavior: 'smooth' });
  }
})();

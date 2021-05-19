// TODO: This file is kind of mess right now, with contributions from numerous contributors
// Rewrite this file using svelte similar to the popup file

const list = document.getElementById('saved-urls');

const getURLObject = value => {
  let item = null;

  // When the data is an array return the item with the highest offset
  if (Array.isArray(value) && value.length) {
    item = value.reduce((prev, current) => (prev.offset > current.offset ? prev : current), { offset: 0 });
    // Fallback case for previous version where the object was stored directly
  } else if (value && typeof value.title === 'string') {
    item = value;
  }

  return item;
};

chrome.storage.local.get('scroll-mark', result => {
  const allScrolls = result['scroll-mark'];
  let delay = 0.3;
  // if no saved scrolls are available
  const heading = document.getElementById('saved-scroll-heading');
  if (Object.entries(allScrolls).length === 0) {
    heading.innerHTML = "<h1 id='saved-scroll-heading'>You don't have any saved scrrolls yet!</h1>";
    heading.parentElement.style.height = '100vh';
  } else {
    heading.innerHTML = "<h1 id='saved-scroll-heading'>All Saved Scrrolls</h1>";

    const btn = document.createElement('div');
    btn.innerHTML = `
      <div id="delete-button">
        <div class="btn del" id="delete-all"> <img src='../images/bin.png'> </div>
      </div>
      `;
    document.body.appendChild(btn);

    Object.keys(allScrolls).forEach(url => {
      const urlObject = getURLObject(allScrolls[url]);
      const title = urlObject.title || url;
      const div = document.createElement('div');
      div.setAttribute('class', 'Scroll');
      div.setAttribute('data-date', urlObject.date ? urlObject.date.slice(0, 15) : '');
      const percentage = Math.round((urlObject.offset / urlObject.total) * 100);

      const deleteText = `
        <div class="dropdown" id="${url}_|_">
          <div id="${url}_|" class="dropdown-content">
                <button class="ScrollElement" id="${url}">Delete</button>
          </div>
        </div>
        `;

      if (percentage) {
        div.innerHTML = `<a href=${url} target='_blank'>${title}</a> <div class='perc'>${percentage}</div>${deleteText}`;
      } else {
        div.innerHTML = `<a href=${url} target='_blank'>${title}</a> <div class='perc'>${0}</div>${deleteText}`;
      }
      div.style.animationDelay = `${(delay += 0.1)}s`;
      list.appendChild(div);
    });
  }

  // function to open dropdown menu
  const showDropdown = function () {
    const dropdowns = Array.from(document.getElementsByClassName('dropdown-content'));
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show_dropdown');
    });
    const dropId = this.id.substring(0, this.id.length - 1);
    document.getElementById(dropId).classList.toggle('show_dropdown');
  };

  // function to close dropdown menu
  const closeDropdown = function (e) {
    const dropdowns = Array.from(document.getElementsByClassName('dropdown-content'));
    if (e.target.className !== 'dropdown') {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('show_dropdown');
      });
    }
  };

  // all dropdown menus
  const dotElements = Array.from(document.getElementsByClassName('dropdown'));

  dotElements.forEach(dotElement => {
    dotElement.addEventListener('click', showDropdown, false);
  });

  const containers = document.getElementsByClassName('container');
  containers[0].addEventListener('click', closeDropdown);

  const scrollElements = Array.from(document.getElementsByClassName('ScrollElement'));
  const deleteAllBtn = document.getElementById('delete-all');

  // TODO: use the delete.js script instead
  // but that would require some modifications to the original delete functionality
  const deleteScrollElement = function () {
    // eslint-disable-next-line no-undef
    Swal.fire({
      title: 'Are you sure?',
      text: 'This scrroll would be removed from your collection.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(res => {
      if (res.value) {
        const { [this.id]: _, ...restData } = allScrolls;
        chrome.storage.local.set({ 'scroll-mark': restData }, () => {
          chrome.runtime.sendMessage('setInactive');
        });
        const x = document.querySelector(`a[href = "${this.id}"]`);
        x.parentElement.parentElement.removeChild(x.parentElement);
        // window.location.reload();
      }
    });
  };

  const deleteAllScrollElement = function () {
    // eslint-disable-next-line no-undef
    Swal.fire({
      title: 'Remove all Scrrolls?',
      text: 'This action is not reversible!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete All',
    }).then(res => {
      if (res.value) {
        chrome.storage.local.set({ 'scroll-mark': {} });
        window.location.reload();
      }
    });
  };

  scrollElements.forEach(scrollElement => {
    scrollElement.addEventListener('click', deleteScrollElement, false);
  });

  if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', deleteAllScrollElement, false);
  }
});

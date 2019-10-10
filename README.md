# Scrroll In
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)

Never forget where you left a page.

<p float="left">

<a href="https://chrome.google.com/webstore/detail/scrroll-in/cjgjbjogfodppempgdlppgefojbcmjom?hl=en&gl=IN" target="_blank">
<img src="https://developer.chrome.com/webstore/images/ChromeWebStore_Badge_v2_496x150.png" alt="Scrroll In - An extension to save scroll position of any webpage | Product Hunt Embed" style="height:64px;margin-right:20px;" height="64px" /></a>
<a href="https://www.producthunt.com/posts/scrroll-in?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-scrroll-in" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=169127&theme=light" alt="Scrroll In - An extension to save scroll position of any webpage | Product Hunt Embed" style="width: 250px; height: 54px;" width="250px" height="54px" /></a>

</p>

> Contribute to this project during hacktoberfest and get exclusive limited edition Devfolio schwag if your pull requests gets merged. [Read more](https://devfolio.co/blog/hacktoberfest-2019-devfolio/)

## Motivation

You must have been in a situation wherein you are reading a long article, but you don't have enough time to finish it, so you close the tab, and the next time you open the article again, you have no idea where you left it.

So this extension lets you save the scroll position of the webpage, so you can continue from exactly where you left.

I know there are a few extensions that already serve this purpose, but most of them either didn't work correctly or lacked the features that I needed, so I ended up creating my own.

## How it works?

Under the hood, this extension uses the [chrome localStorage API](https://developer.mozilla.org/en/DOM/Storage#localStorage) to store the scroll positions for different webpages. I avoided using sync storage due to its storage limitations ([read more](https://developer.chrome.com/apps/storage)). This extension creates an object which stores the URL as keys and the scroll position as values.

The functions for adding or updating, reading and deleting are in the files `save.js`, `get.js` and `delete.js` respectively, which are executed as content scripts from `popup.js` whenever the respective button is clicked.

The `background.js` handles switching icon color part whenever a tab is changed, or the URL is updated.

The popup sheet is also handled by `popup.js` by dynamically changing the UI following the availability of the URL in the localStorage object.

## Development

To run the extension locally follow these steps

- Visit `chrome://extensions` and turn on developer mode.
- Click on load unpacked and select the extension root folder.
- Now you can go ahead and modify `popup.js` or `popup.html`, changes would directly be visible in the extension.
- If you change something in `background.js` or `manifest.json` then you will need to reload the extension.

## Contributing

All you need to know for contributing to this project is basic JavaScript, HTML, and CSS.

You can visit the issues page to find some relevant issues to contribute to or feel free to open a new issue for something that you think can be improved.

Also, if you have any doubts regarding any of the concepts or how to get started, feel free to drop me a message on [twitter](https://twitter.com/psuranas) or the [Devfolio community telegram group](https://t.me/devfolio).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="http://prateeksurana.me"><img src="https://avatars3.githubusercontent.com/u/21277179?v=4" width="100px;" alt="Prateek Surana"/><br /><sub><b>Prateek Surana</b></sub></a><br /><a href="https://github.com/devfolioco/scrroll-in/commits?author=prateek3255" title="Code">💻</a> <a href="#design-prateek3255" title="Design">🎨</a> <a href="#content-prateek3255" title="Content">🖋</a> <a href="https://github.com/devfolioco/scrroll-in/commits?author=prateek3255" title="Documentation">📖</a></td>
    <td align="center"><a href="http://laylawrote.com"><img src="https://avatars3.githubusercontent.com/u/19983454?v=4" width="100px;" alt="Layla Hedges"/><br /><sub><b>Layla Hedges</b></sub></a><br /><a href="https://github.com/devfolioco/scrroll-in/commits?author=N7Layla" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shikharsaxena98"><img src="https://avatars1.githubusercontent.com/u/21315618?v=4" width="100px;" alt="shikharsaxena98"/><br /><sub><b>shikharsaxena98</b></sub></a><br /><a href="https://github.com/devfolioco/scrroll-in/commits?author=shikharsaxena98" title="Code">💻</a></td>
    <td align="center"><a href="http://adityaketkar.me"><img src="https://avatars0.githubusercontent.com/u/22611315?v=4" width="100px;" alt="Aditya Ketkar"/><br /><sub><b>Aditya Ketkar</b></sub></a><br /><a href="#design-adityaketkar" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/DEBSUBHRO"><img src="https://avatars0.githubusercontent.com/u/42496309?v=4" width="100px;" alt="DEBSUBHRA ROY"/><br /><sub><b>DEBSUBHRA ROY</b></sub></a><br /><a href="#design-DEBSUBHRO" title="Design">🎨</a></td>
    <td align="center"><a href="http://aashisresume.firebaseapp.com"><img src="https://avatars2.githubusercontent.com/u/29084675?v=4" width="100px;" alt="Aashis kumar"/><br /><sub><b>Aashis kumar</b></sub></a><br /><a href="https://github.com/devfolioco/scrroll-in/commits?author=aesher9o1" title="Code">💻</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

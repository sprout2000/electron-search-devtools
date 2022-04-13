# :mag: electron-search-devtools

[![GitHub license](https://img.shields.io/github/license/sprout2000/electron-search-devtools)](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md)
![node-current](https://img.shields.io/node/v/electron-search-devtools)
![GitHub last commit](https://img.shields.io/github/last-commit/sprout2000/electron-search-devtools)
![npm](https://img.shields.io/npm/dt/electron-search-devtools)
![GitHub top language](https://img.shields.io/github/languages/top/sprout2000/electron-search-devtools)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/electron-search-devtools)

**Locate the installed developer tools for [Electron](https://www.electronjs.org/).**

## :warning: Requirements

- [Electron](https://www.electronjs.org/): [v11.3.0](https://www.electronjs.org/releases/stable?version=11&page=3#11.3.0) or greater is required.

## :inbox_tray: Install

```sh
$ npm install electron-search-devtools --save-dev
```

## :hammer_and_wrench: Usage

```javascript
// `session` is required.
const { app, BrowserWindow, session } = require('electron');
// import this module:
const { searchDevtools } = require('electron-search-devtools');

const createWindow = () => {
  const mainWindow = new BrowserWindow();
  mainWindow.loadFile('dist/index.html');

  /**
   *
   * You can choose from the following six arguments:
   * 'REACT', 'REDUX', 'VUE', 'VUE3', 'ANGULAR' or 'JQUERY'.
   *
   */
  searchDevtools('REACT')
    .then((devtools) => {
    /**
     * If you want to use 'loadFile' instead of 'loadURL',
     * you'll need to set `allowFileAccess` to true.
     */
      session.defaultSession.loadExtension(devtools, { allowFileAccess: true });
    })
    .catch((err) => console.log(err));
};
```

## :green_book: API

### `searchDevtools(devtoolsName, { options }) => Promise<string | void>`

### devtoolsName

Type: `'REACT'` | `'REDUX'` | `'VUE'` | `'VUE3'` | `'ANGULAR'` | `'JQUERY'` (**required**)

### options

**`profile`**
- Type: _string_
- Default: `'Default'`

**`browser`**
- Type: `'google-chrome'` | `'chromium'` | `'chromium-snap'`
- Default: `'google-chrome'`

If you are using Chromium on Linux, specify `chromium` or `chromium-snap`.


## :clipboard: Types

```typescript
Devtools: 'JQUERY' | 'ANGULAR' | 'VUE' | 'VUE3' | 'REACT' | 'REDUX';
Options: {
    profile?: string;
    browser?: 'google-chrome' | 'chromium' | 'chromium-snap';
}

searchDevtools: (arg: Devtools, options?: Options | undefined) => Promise<string | void>;
```

## :classical_building: License

Copyright (c) 2021 sprout2000 and other contributors  
[MIT](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md) Licensed

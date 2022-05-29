# :mag: electron-search-devtools

[![GitHub license](https://img.shields.io/github/license/sprout2000/electron-search-devtools)](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md)
![coverage](./coverage/badge-statements.svg)
![npm](https://img.shields.io/npm/dt/electron-search-devtools)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/electron-search-devtools)

**Locate the installed developer tools for [Electron](https://www.electronjs.org/).**

## :warning: Requirements

- [Electron](https://www.electronjs.org/): [v11.3.0](https://www.electronjs.org/releases/stable?version=11&page=3#11.3.0) or greater is required.

## :inbox_tray: Install

```sh
npm i -D electron-search-devtools
```

## :hammer_and_wrench: Usage

```javascript
// Load `session` and this module.
const { app, BrowserWindow, session } = require('electron');
const { searchDevtools } = require('electron-search-devtools');

app.whenReady().then(() => {
  const win = new BrowserWindow();
  win.loadFile('index.html');

  // 'REACT', 'REDUX', 'VUE', 'VUE3', 'ANGULAR', 'PREACT' or 'JQUERY'
  searchDevtools('REACT').then((devtools) => {
    /**
     * If you want to use `loadFile` instead of `loadURL`,
     * you will need to set `allowFileAccess` to true.
     */
    session.defaultSession.loadExtension(devtools, { allowFileAccess: true });
  });
});

app.once('window-all-closed', () => app.quit());
```

## :green_book: API

```typescript
searchDevtools: (arg: Devtools, options?: Options | undefined) => Promise<string>;

Devtools: 'JQUERY' | 'ANGULAR' | 'VUE' | 'VUE3' | 'REACT' | 'REDUX' | 'PREACT';
Options: {
    profile?: string;
    browser?: 'google-chrome' | 'chromium';
}
```

### Devtools

Type: `'REACT'` | `'REDUX'` | `'VUE'` | `'VUE3'` | `'ANGULAR'` | `'JQUERY'` | `'PREACT'` (**required**)

### Options

**`profile`**
- Type: _string_
- Default: `'Default'`

**`browser`**
- Type: `'google-chrome'` | `'chromium'`
- Default: `'google-chrome'`

If you are using Chromium on Linux, specify `chromium`.

## :classical_building: License

Copyright (c) 2021 sprout2000

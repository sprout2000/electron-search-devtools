# electron-search-devtools

[![GitHub license](https://img.shields.io/github/license/sprout2000/electron-search-devtools)](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sprout2000_electron-search-devtools&metric=alert_status)](https://sonarcloud.io/dashboard?id=sprout2000_electron-search-devtools)
![node-current](https://img.shields.io/node/v/electron-search-devtools)
![npm](https://img.shields.io/npm/dt/electron-search-devtools)
![GitHub top language](https://img.shields.io/github/languages/top/sprout2000/electron-search-devtools)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/electron-search-devtools)

Locate the developer tools for Electron.

## Requirements

- [Node.js](https://nodejs.org/): [v14.x](https://nodejs.org/dist/latest-v14.x/docs/api/) or greater is required.
- [Electron](https://www.electronjs.org/): [v11.3.0](https://www.electronjs.org/releases/stable?version=11&page=3#11.3.0) or greater is required.

## Install

```sh
$ npm install electron-search-devtools --save-dev
```

## Usage

```javascript
const { BrowserWindow, app, session } = require('electron');
const { searchDevtools } = require('electron-search-devtools');

const createWindow = () => {
  const mainWindow = new BrowserWindow();
  mainWindow.loadFile('index.html');
};

app.whenReady().then(async () => {
  /**
   *
   * You can choose from the following six arguments:
   * 'REACT', 'REDUX', 'VUE', 'VUE3', 'ANGULAR' or 'JQUERY'.
   *
   */
  const devtool = await searchDevtools('REACT');
  if (devtool) {
    await session.defaultSession.loadExtension(devtool, { allowFileAccess: true });
  }

  createWindow();
});

app.once('window-all-closed', () => app.quit());
```

## Types

```typescript
type Devtools = 'JQUERY' | 'ANGULAR' | 'VUE' | 'VUE3' | 'REACT' | 'REDUX';
interface Options {
    profile?: string;
    browser?: 'google-chrome' | 'chromium';
}

const searchDevtools: (arg: Devtools, options?: Options | undefined) => Promise<string | void>;
```

## License

[MIT](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md) © 2021 sprout2000 and other contributors.

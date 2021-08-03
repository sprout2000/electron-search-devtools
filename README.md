# electron-search-devtools

[![GitHub license](https://img.shields.io/github/license/sprout2000/electron-search-devtools)](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sprout2000_electron-search-devtools&metric=alert_status)](https://sonarcloud.io/dashboard?id=sprout2000_electron-search-devtools)
![node-current](https://img.shields.io/node/v/electron-search-devtools)
![npm](https://img.shields.io/npm/dt/electron-search-devtools)
![GitHub top language](https://img.shields.io/github/languages/top/sprout2000/electron-search-devtools)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/electron-search-devtools)

Locate the developer tools for Electron.

## Requirements

- [Electron](https://www.electronjs.org/): [v11.3.0](https://www.electronjs.org/releases/stable?version=11&page=3#11.3.0) or greater is required.

## Install

```sh
$ npm install electron-search-devtools --save-dev
```

## Usage

```javascript
// `session` is required.
const { BrowserWindow, app, session } = require('electron');
// import this module:
const { searchDevtools } = require('electron-search-devtools');

const createWindow = () => {
  const mainWindow = new BrowserWindow();
  mainWindow.loadFile('index.html');
};

// `async/await` is required.
app.whenReady().then(async () => {
  /**
   *
   * You can choose from the following six arguments:
   * 'REACT', 'REDUX', 'VUE', 'VUE3', 'ANGULAR' or 'JQUERY'.
   *
   */
  const devtools = await searchDevtools('REACT');
  if (devtools) {
    /** 
     * If you want to use 'loadFile' instead of 'loadURL',
     * you'll need the `allowFileAccess` option.
    */
    await session.defaultSession.loadExtension(devtools, { allowFileAccess: true });
  }

  createWindow();
});

app.once('window-all-closed', () => app.quit());
```

## API

### `searchDevtools(devtoolsName, { options }) -> Promise<string | void>`

### devtoolsName

Type: `'REACT' | 'REDUX' | 'VUE' | 'VUE3' | 'ANGULAR' | 'JQUERY'` (_required_)

### options

**`profile`**
- Type: `string`
- Default: `Default`

**`browser`**
- Type: `'google-chrome' | 'chromium' | 'edge'`
- Default: `google-chrome`

If you are using Chromium on Linux, specify `chromium`.


## Types

```typescript
Devtools: 'JQUERY' | 'ANGULAR' | 'VUE' | 'VUE3' | 'REACT' | 'REDUX';
Options: {
    profile?: string;
    browser?: 'google-chrome' | 'chromium' | 'edge';
}

searchDevtools: (arg: Devtools, options?: Options | undefined) => Promise<string | void>;
```

## License

[MIT](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md) © 2021 sprout2000 and other contributors.

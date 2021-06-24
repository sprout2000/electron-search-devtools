# electron-search-devtools

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=sprout2000_electron-search-devtools&metric=alert_status)](https://sonarcloud.io/dashboard?id=sprout2000_electron-search-devtools)
[![GitHub license](https://img.shields.io/github/license/sprout2000/electron-search-devtools)](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md)
[![GitHub stars](https://img.shields.io/github/stars/sprout2000/electron-search-devtools)](https://github.com/sprout2000/electron-search-devtools/stargazers)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/sprout2000/electron-search-devtools)

Find the Developer Tools for Electron v13.x.

## Requirements

- [Node.js](https://nodejs.org/en/): v14+
- [npm-cli](https://github.com/npm/cli): v7+
- [Electron](https://www.electronjs.org/): v13+

## Install

```sh
$ npm install electron-search-devtools --save-dev
```

## Usage

```javascript
const { app, session } = require('electron');
const { searchDevtools } = require('electron-search-devtools');

app.whenReady().then(async () => {
  /**
   * You can choose from the following three arguments.
   *
   * 'REACT', 'REDUX' or 'VUE'
  */
  const devtool = await searchDevtools('REACT');

  if (devtool) {
    await session.defaultSession.loadExtension(devtool, { allowFileAccess: true });
  }

  createWindow();
});
```

## Types

```typescript
type Devtools = 'VUE' | 'REACT' | 'REDUX';
const searchDevtools: (arg: Devtools) => Promise<string | void | undefined>;
```

## License

[MIT](https://github.com/sprout2000/electron-search-devtools/blob/master/LICENSE.md) © 2021 sprout2000 and other contributors.

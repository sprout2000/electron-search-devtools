# electron-search-devtools

Find the Developer Tools for Electron v13.x.

## Requrements

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

/**
 * You can choose from the following three arguments.
 *
 * 'REACT', 'REDUX' or 'VUE'
 */

app.whenReady().then(async () => {
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

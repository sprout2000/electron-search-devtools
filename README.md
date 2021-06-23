# electron-search-devtools

Find React Developer Tools for Electron v13.x.

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
  const devtool = await searchDevtools();

  if (devtool) {
    await session.defaultSession.loadExtension(devtool, { allowFileAccess: true });
  }

  createWindow();
});
```

## Types

```typescript
const searchDevtools: (arg: Devtools) => Promise<string | void | undefined>;
```

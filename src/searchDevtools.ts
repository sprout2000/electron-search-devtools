import os from 'os';
import fs from 'fs';
import path from 'path';

export const getExtDir = (platform: string): string => {
  if (platform === 'darwin') {
    return '/Library/Application Support/Google/Chrome';
  } else if (platform === 'win32') {
    return '/AppData/Local/Google/Chrome/User Data';
  } else {
    return '/.config/google-chrome';
  }
};

export const searchDevtools = async (): Promise<string | void | undefined> => {
  const reactDevtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
  const dirPath = path.join(
    os.homedir(),
    getExtDir(os.platform()),
    reactDevtools
  );

  return fs.promises
    .readdir(dirPath, { withFileTypes: true })
    .then((dirents) =>
      dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift()
    )
    .then((extPath) => {
      console.log(extPath);
      return extPath;
    })
    .catch((err) => console.log(err));
};

import os from 'os';
import fs from 'fs';
import path from 'path';

export type Devtools = 'VUE' | 'REACT' | 'REDUX';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeGuardArg = (arg: any): arg is Devtools => {
  return (
    arg !== null &&
    typeof arg === 'string' &&
    (arg === 'VUE' || arg === 'REACT' || arg === 'REDUX')
  );
};

export const whichDevtools = (arg: Devtools): string => {
  if (arg === 'REACT') {
    return '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
  } else if (arg === 'REDUX') {
    return '/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd';
  } else {
    return '/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd';
  }
};

export const getExtDir = (platform: string): string => {
  if (platform === 'darwin') {
    return '/Library/Application Support/Google/Chrome';
  } else if (platform === 'win32') {
    return '/AppData/Local/Google/Chrome/User Data';
  } else {
    return '/.config/google-chrome';
  }
};

export const searchDevtools = async (
  arg: Devtools
): Promise<string | void | undefined> => {
  if (!typeGuardArg(arg)) {
    console.log(
      'You need to select one of the three arguments "REACT", "REDUX", and "VUE".'
    );
    return;
  }

  const devtools = whichDevtools(arg);
  const dirPath = path.join(os.homedir(), getExtDir(os.platform()), devtools);

  return fs.promises
    .readdir(dirPath, { withFileTypes: true })
    .then((dirents) =>
      dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift()
    )
    .then((extPath) => {
      return extPath;
    })
    .catch((err) => console.log(`Error: ${err.code}`));
};

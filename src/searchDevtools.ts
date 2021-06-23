import os from 'os';
import fs from 'fs';
import path from 'path';

export type Devtools = 'VUE' | 'REACT' | 'REDUX';

export const getExtDir = (platform: string): string => {
  if (platform === 'darwin') {
    return '/Library/Application Support/Google/Chrome';
  } else if (platform === 'win32') {
    return '/AppData/Local/Google/Chrome/User Data';
  } else {
    return '/.config/google-chrome';
  }
};

export const whichDevtools = (arg: Devtools): string => {
  if (arg === 'VUE') {
    return '/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd';
  } else if (arg === 'REDUX') {
    return '/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd';
  } else {
    return '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeGuardArg = (arg: any): arg is Devtools => {
  return (
    arg !== null &&
    typeof arg === 'string' &&
    (arg === 'VUE' || arg === 'REACT' || arg === 'REDUX')
  );
};

export const searchDevtools = async (
  arg: Devtools
): Promise<string | void | undefined> => {
  if (!typeGuardArg(arg)) {
    console.log('The argument must be one of "REACT", "REDUX" or "VUE".');
    return;
  }

  const dirPath = path.join(
    os.homedir(),
    getExtDir(os.platform()),
    whichDevtools(arg)
  );

  return fs.promises
    .readdir(dirPath, { withFileTypes: true })
    .then((dirents) =>
      dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift()
    )
    .then((log) => console.log(log))
    .catch((err) => console.log(err));
};

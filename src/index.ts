import os from 'os';
import fs from 'fs';
import path from 'path';

export type Options = {
  profile?: string;
  browser?: 'google-chrome' | 'chromium';
};

export type Devtools =
  | 'JQUERY'
  | 'ANGULAR'
  | 'VUE'
  | 'VUE3'
  | 'REACT'
  | 'REDUX'
  | 'PREACT';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeGuardArg = (arg: any): arg is Devtools => {
  return (
    arg !== null &&
    typeof arg === 'string' &&
    (arg === 'JQUERY' ||
      arg === 'ANGULAR' ||
      arg === 'VUE3' ||
      arg === 'VUE' ||
      arg === 'REACT' ||
      arg === 'REDUX' ||
      arg === 'PREACT')
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const typeGuardOptions = (options: any): options is Options => {
  if (options === undefined) return true;
  if (typeof options !== 'object') return false;
  if (options['profile'] === undefined && options['browser'] === undefined) {
    return false;
  }

  if (
    typeof options['profile'] === 'string' ||
    options['profile'] === undefined
  ) {
    switch (options['browser']) {
      case undefined:
        return true;
      case 'google-chrome':
        return true;
      case 'chromium':
        return true;
      default:
        return false;
    }
  } else {
    return false;
  }
};

export const whichDevtools = (arg: Devtools) => {
  switch (arg) {
    case 'JQUERY':
      return `dbhhnnnpaeobfddmlalhnehgclcmjimi`;
    case 'ANGULAR':
      return `ienfalfjdbdpebioblfackkekamfmbnh`;
    case 'VUE3':
      return `ljjemllljcmogpfapbkkighbhhppjdbg`;
    case 'VUE':
      return `nhdogjmejiglipccpnnnanhbledajbpd`;
    case 'REDUX':
      return `lmhkpmbekcpmknklioeibfkpmmfibljd`;
    case 'REACT':
      return `fmkadmapgofadopljbjfkapdkoienihi`;
    case 'PREACT':
      return `ilcajpmogmhpliinlbcdebhbcanbghmd`;
    default:
      return '';
  }
};

export const getOptions = (options?: Options): Options => {
  const profile = options ? options.profile || 'Default' : 'Default';
  const browser = options
    ? options.browser || 'google-chrome'
    : 'google-chrome';

  return { profile, browser };
};

export const getExtDir = (platform: string, options?: Options) => {
  const provided = getOptions(options);
  if (platform === 'darwin') {
    return `Library/Application Support/Google/Chrome/${provided['profile']}/Extensions`;
  } else if (platform === 'win32') {
    return `AppData/Local/Google/Chrome/User Data/${provided['profile']}/Extensions`;
  } else {
    return `.config/${provided['browser']}/${provided['profile']}/Extensions`;
  }
};

export const searchDevtools = async (arg: Devtools, options?: Options) => {
  if (!typeGuardArg(arg)) {
    throw new Error(
      'You need to select an argument from the following six choices:\n "REACT", "REDUX", "ANGULAR", "VUE", "VUE3", "PREACT" or "JQUERY".'
    );
  }

  if (!typeGuardOptions(options)) {
    throw new Error(
      'The option should be an object containing the name of the profile or browser.'
    );
  }

  const dirPath = path.join(
    os.homedir(),
    getExtDir(os.platform(), { ...getOptions(options) }),
    whichDevtools(arg)
  );

  return fs.promises
    .readdir(dirPath, { withFileTypes: true })
    .then(
      (dirents) =>
        dirents
          .filter((dirent) => dirent.isDirectory())
          .filter(({ name }) => name.match(/(?:\d+\.\d+|\d{2,})\.\d+_\d+$/))
          .map(({ name }) => path.resolve(dirPath, name))
          .slice(-1)[0]
    )
    .catch(() => {
      throw new Error(`${arg} Devtools is not found.`);
    });
};

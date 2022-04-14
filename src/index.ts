import os from 'os';
import fs from 'fs';
import path from 'path';

export type Options = {
  profile?: string;
  browser?: 'google-chrome' | 'chromium' | 'chromium-snap';
};

export type Devtools =
  | 'JQUERY'
  | 'ANGULAR'
  | 'VUE'
  | 'VUE3'
  | 'REACT'
  | 'REDUX';

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
      arg === 'REDUX')
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
      case 'chromium-snap':
        return true;
      default:
        return false;
    }
  } else {
    return false;
  }
};

export const whichDevtools = (arg: Devtools, profile: Options['profile']) => {
  const userProfile = profile || 'Default';
  switch (arg) {
    case 'JQUERY':
      return `/${userProfile}/Extensions/dbhhnnnpaeobfddmlalhnehgclcmjimi`;
    case 'ANGULAR':
      return `/${userProfile}/Extensions/ienfalfjdbdpebioblfackkekamfmbnh`;
    case 'VUE3':
      return `/${userProfile}/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg`;
    case 'VUE':
      return `/${userProfile}/Extensions/nhdogjmejiglipccpnnnanhbledajbpd`;
    case 'REDUX':
      return `/${userProfile}/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd`;
    case 'REACT':
      return `/${userProfile}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`;
    default:
      return `/${userProfile}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`;
  }
};

export const getExtDir = (platform: string, browser: Options['browser']) => {
  if (platform === 'darwin') {
    return '/Library/Application Support/Google/Chrome';
  } else if (platform === 'win32') {
    return '/AppData/Local/Google/Chrome/User Data';
  } else if (browser === 'chromium-snap') {
    return '/snap/chromium/common/chromium';
  } else {
    return `/.config/${browser}`;
  }
};

export const getOptions = (options?: Options): Options => {
  const profile = options ? options.profile || 'Default' : 'Default';
  const browser = options
    ? options.browser || 'google-chrome'
    : 'google-chrome';

  return { profile, browser };
};

export const searchDevtools = async (arg: Devtools, options?: Options) => {
  if (!typeGuardArg(arg)) {
    throw new Error(
      'You need to select an argument from the following six choices:\n "REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".'
    );
  }

  if (!typeGuardOptions(options)) {
    throw new Error(
      'The option should be an object containing the name of the profile or browser.'
    );
  }

  const providedOptions = getOptions(options);
  const devtools = whichDevtools(arg, providedOptions.profile);
  const dirPath = path.join(
    os.homedir(),
    getExtDir(os.platform(), providedOptions.browser),
    devtools
  );

  return fs.promises
    .readdir(dirPath, { withFileTypes: true })
    .then((dirents) =>
      dirents
        .filter((dirent) => dirent.isDirectory())
        .filter(({ name }) => name.match(/(?:\d+\.\d+|\d{2,})\.\d+_\d+$/))
        .map(({ name }) => path.resolve(dirPath, name))
    )
    .then((entries) => {
      const latest = entries[entries.length - 1];
      if (fs.existsSync(`${latest}${path.sep}manifest.json`)) {
        return latest;
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      throw new Error(`${arg} Devtools is not found.`);
    });
};

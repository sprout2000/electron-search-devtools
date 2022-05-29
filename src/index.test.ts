/** THIS TEST ASSUMES THAT ONLY THE REACT DEVTOOLS EXTENSION IS INSTALLED. */

import os from 'os';
import fs from 'fs';
import path from 'path';

import {
  Devtools,
  Options,
  getExtDir,
  getOptions,
  whichDevtools,
  searchDevtools,
  typeGuardOptions,
} from '.';

describe('Test Suites', () => {
  test('test whichDevtools()', () => {
    const jquery = whichDevtools('JQUERY');
    expect(jquery).toBe('dbhhnnnpaeobfddmlalhnehgclcmjimi');

    const angular = whichDevtools('ANGULAR');
    expect(angular).toBe('ienfalfjdbdpebioblfackkekamfmbnh');

    const react = whichDevtools('REACT');
    expect(react).toBe('fmkadmapgofadopljbjfkapdkoienihi');

    const redux = whichDevtools('REDUX');
    expect(redux).toBe('lmhkpmbekcpmknklioeibfkpmmfibljd');

    const vue = whichDevtools('VUE');
    expect(vue).toBe('nhdogjmejiglipccpnnnanhbledajbpd');

    const vue3 = whichDevtools('VUE3');
    expect(vue3).toBe('ljjemllljcmogpfapbkkighbhhppjdbg');

    const preact = whichDevtools('PREACT');
    expect(preact).toBe('ilcajpmogmhpliinlbcdebhbcanbghmd');

    const defaultArg = whichDevtools('' as Devtools);
    expect(defaultArg).toBe('');
  });

  test('test getOptions()', () => {
    const nonOption = getOptions();
    expect(nonOption.profile).toBe('Default');
    expect(nonOption.browser).toBe('google-chrome');

    const profileOption = getOptions({ profile: 'User1' });
    expect(profileOption.profile).toBe('User1');

    const browserOption = getOptions({ browser: 'google-chrome' });
    expect(browserOption.profile).toBe('Default');
  });

  test('test getExtDir()', () => {
    const darwin = getExtDir('darwin');
    expect(darwin).toBe(
      'Library/Application Support/Google/Chrome/Default/Extensions'
    );

    const win32 = getExtDir('win32');
    expect(win32).toBe(
      'AppData/Local/Google/Chrome/User Data/Default/Extensions'
    );

    const linux = getExtDir('linux');
    expect(linux).toBe('.config/google-chrome/Default/Extensions');

    const linuxChromium = getExtDir('linux', {
      browser: 'chromium',
    });
    expect(linuxChromium).toBe('.config/chromium/Default/Extensions');
  });

  test('test arguments', () => {
    expect(searchDevtools('APP' as Devtools)).rejects.toThrow(
      'You need to select an argument from the following six choices:\n "REACT", "REDUX", "ANGULAR", "VUE", "VUE3", "PREACT" or "JQUERY".'
    );
  });

  test('test options', () => {
    const result = typeGuardOptions({ browser: undefined, profile: undefined });
    expect(result).toBe(false);

    const undefinedProfile = typeGuardOptions({ browser: 'google-chrome' });
    expect(undefinedProfile).toBe(true);

    const undefinedBrowser = typeGuardOptions({
      profile: 'Default',
      browser: undefined,
    });
    expect(undefinedBrowser).toBe(true);

    const chromiumBrowser = typeGuardOptions({
      profile: 'Default',
      browser: 'chromium',
    });
    expect(chromiumBrowser).toBe(true);

    const invalidBrowser = typeGuardOptions({
      profile: 'Default',
      browser: [],
    });
    expect(invalidBrowser).toBe(false);

    const invalidOptions = typeGuardOptions({
      profile: 3,
    });
    expect(invalidOptions).toBe(false);
  });

  test('test invalid options', () => {
    expect(searchDevtools('REACT', '' as unknown as Options)).rejects.toThrow(
      'The option should be an object containing the name of the profile or browser.'
    );
  });

  test('test not installed devtools', () => {
    // Are you sure you haven't installed Redux devtools?
    expect(searchDevtools('REDUX')).rejects.toThrow(
      'REDUX Devtools is not found.'
    );
  });

  test('test searchDevtools("REACT")', async () => {
    // Are you sure you have installed React devtools?
    const extDir = 'fmkadmapgofadopljbjfkapdkoienihi';
    const devtools = path.join(os.homedir(), getExtDir(os.platform()), extDir);

    const latest = await fs.promises
      .readdir(devtools, { withFileTypes: true })
      .then(
        (dirents) =>
          dirents
            .filter((dirent) => dirent.isDirectory())
            .map(({ name }) => name)
            .slice(-1)[0]
      );

    const result = await searchDevtools('REACT');
    expect(result).toBe(path.join(devtools, latest));
  });
});

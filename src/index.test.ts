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
    const profile = 'Default';

    const jquery = whichDevtools('JQUERY', profile);
    expect(jquery).toBe(
      `/${profile}/Extensions/dbhhnnnpaeobfddmlalhnehgclcmjimi`
    );
    const angular = whichDevtools('ANGULAR', profile);
    expect(angular).toBe(
      `/${profile}/Extensions/ienfalfjdbdpebioblfackkekamfmbnh`
    );
    const react = whichDevtools('REACT', profile);
    expect(react).toBe(
      `/${profile}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`
    );
    const redux = whichDevtools('REDUX', profile);
    expect(redux).toBe(
      `/${profile}/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd`
    );
    const vue = whichDevtools('VUE', profile);
    expect(vue).toBe(`/${profile}/Extensions/nhdogjmejiglipccpnnnanhbledajbpd`);
    const vue3 = whichDevtools('VUE3', profile);
    expect(vue3).toBe(
      `/${profile}/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg`
    );
    const defaultArg = whichDevtools('' as Devtools, '');
    expect(defaultArg).toBe(
      `/${profile}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`
    );
  });

  test('test getExtDir()', () => {
    const darwin = getExtDir('darwin', 'google-chrome');
    expect(darwin).toBe('/Library/Application Support/Google/Chrome');
    const win32 = getExtDir('win32', 'google-chrome');
    expect(win32).toBe('/AppData/Local/Google/Chrome/User Data');
    const linux = getExtDir('linux', 'google-chrome');
    expect(linux).toBe('/.config/google-chrome');
    const linuxChromium = getExtDir('linux', 'chromium');
    expect(linuxChromium).toBe('/.config/chromium');
    const snapChromium = getExtDir('linux', 'chromium-snap');
    expect(snapChromium).toBe('/snap/chromium/common/chromium');
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

  test('test arguments', () => {
    expect(searchDevtools('APP' as Devtools)).rejects.toThrow(
      'You need to select an argument from the following six choices:\n "REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".'
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
    const snapBrowser = typeGuardOptions({
      profile: 'Default',
      browser: 'chromium-snap',
    });
    expect(snapBrowser).toBe(true);
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

  test('test installed but invalid devtools', () => {
    /**
     * Are you sure you just created an empty directory called
     * '$EXTDIR/ljjemllljcmogpfapbkkighbhhppjdbg'?
     */
    expect(searchDevtools('VUE3')).rejects.toThrow(
      'VUE3 Devtools is not found.'
    );
  });

  test('test searchDevtools("REACT")', async () => {
    // Are you sure you have installed React devtools?
    const devtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
    const present = path.join(
      os.homedir(),
      getExtDir(os.platform(), 'google-chrome'),
      devtools
    );

    const versions = await fs.promises
      .readdir(present, { withFileTypes: true })
      .then((dirents) =>
        dirents.filter((dirent) => dirent.isDirectory()).map(({ name }) => name)
      );

    const result = await searchDevtools('REACT');
    expect(result).toBe(path.join(present, versions[0]));
  });
});

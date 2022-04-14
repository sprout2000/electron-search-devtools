/**
 *
 * THIS TEST ASSUMES THAT YOU HAVE NEITHER VUE,VUE3, NOR ANGULAR INSTALLED
 * AND THAT YOU HAVE REACT DEVTOOLS INSTALLED.
 *
 */

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

describe('test searchDevtools("REACT")', () => {
  test('test whichDevtools() with profile', () => {
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

  test('test the arguments', () => {
    expect(searchDevtools('APP' as Devtools)).rejects.toThrow(
      'You need to select an argument from the following six choices: "REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".'
    );
  });

  test('test the options', () => {
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

  test('test for error output', () => {
    expect(searchDevtools('REACT', '' as unknown as Options)).rejects.toThrow(
      'The option should be an object containing the name of the profile or browser.'
    );
  });

  test('test searchDevtools("REDUX")', async () => {
    const log = jest.spyOn(console, 'log').mockReturnValue();
    // Are you sure you haven't installed Redux devtools?
    await searchDevtools('REDUX');
    expect(log).nthCalledWith(1, 'Redux Devtools is not found.');
    log.mockRestore();
  });

  test('test searchDevtools("VUE3")', async () => {
    const log = jest.spyOn(console, 'log').mockReturnValue();
    // Are you sure you just created an empty directory called 'ljjem~'?
    await searchDevtools('VUE3');
    expect(log).nthCalledWith(1, 'Vue3 Devtools is undefined or not found.');
    log.mockRestore();
  });

  test('test searchDevtools("VUE")', async () => {
    // Are you sure you've created a directory called 'nhdo~' with no manifest.json?
    await searchDevtools('VUE').catch(() => {
      const log = jest.spyOn(console, 'log').mockReturnValue();
      expect(log).nthCalledWith(
        1,
        'manifest.json for Vue Devtools is not found.'
      );
      log.mockRestore();
    });
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

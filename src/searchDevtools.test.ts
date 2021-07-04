/**
 *
 * THIS TEST ASSUMES THAT YOU DO NOT HAVE VUE DEVTOOLS,
 * VUE3 DEVTOOLS, AND ANGULAR DEVTOOLS INSTALLED.
 * 
 * /

/**
 * 
 * Note: Before testing, you need to do the following:
 * 
 * $ mkdir -p $HOME/path_to_chrome_extensions/ljjemllljcmogpfapbkkighbhhppjdbg
 * $ mkdir -p $HOME/path_to_chrome_extensions/nhdogjmejiglipccpnnnanhbledajbpd/10.0_1
 *
 */

import os from 'os';
import path from 'path';

import {
  Devtools,
  Options,
  getExtDir,
  whichDevtools,
  searchDevtools,
  typeGuardOptions,
} from './searchDevtools';

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
    const defaultArg = whichDevtools('' as Devtools);
    expect(defaultArg).toBe(
      `/${profile}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`
    );
  });

  test('test getExtDir()', () => {
    const darwin = getExtDir('darwin');
    expect(darwin).toBe('/Library/Application Support/Google/Chrome');
    const win32 = getExtDir('win32');
    expect(win32).toBe('/AppData/Local/Google/Chrome/User Data');
    const linux = getExtDir('linux');
    expect(linux).toBe('/.config/google-chrome');
  });

  test('check the arguments', () => {
    const log = jest.spyOn(console, 'log').mockReturnValue();
    searchDevtools('APP' as Devtools);
    expect(log).nthCalledWith(
      1,
      'You need to select an argument from the following six choices:\n',
      '"REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".'
    );
    log.mockRestore();
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
    const log = jest.spyOn(console, 'log').mockReturnValue();
    searchDevtools('REACT', '' as unknown as Options);
    expect(log).nthCalledWith(
      1,
      'The option should be an object containing the name of the profile or browser.'
    );
    log.mockRestore();
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
    expect(log).nthCalledWith(1, 'Vue3 Devtools is undefined.');
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
    const present = path.join(os.homedir(), getExtDir(os.platform()), devtools);
    // Have you checked the version?
    const version = '4.13.5_0';

    const result = await searchDevtools('REACT');
    expect(result).toBe(path.join(present, version));
  });
});

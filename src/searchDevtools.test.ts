/**
 *
 * THIS TEST ASSUMES THAT YOU HAVE NEITHER VUE,VUE3, NOR ANGULAR INSTALLED.
 * AND BEFORE TESTING, YOU WILL NEED TO RUN THE FOLLOWING SCRIPT.
 *
 */

/** prepare-test.sh
 *
 * #! /usr/bin/env bash
 *
 * if [ "$(uname)" == 'Darwin' ]; then
 *   OS='darwin'
 * elif [ "$(expr substr $(uname -s) 1 5)" == 'Linux' ]; then
 *   OS='linux'
 * elif [ "$(expr substr $(uname -s) 1 10)" == 'MINGW64_NT' ];  then
 *   OS='win32'
 * else
 *   echo "Your platform ($(uname -a)) is not supported."
 *   exit 1
 * fi
 *
 * VUE='Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg'
 * VUE3='Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/10.0_1'
 *
 * if [ ${OS} == 'darwin' ]; then
 *   mkdir -p ~/Library/Application\ Support/Google/Chrome/${VUE}
 *   mkdir -p ~/Library/Application\ Support/Google/Chrome/${VUE3}
 * elif [ ${OS} == 'linux' ]; then
 *   mkdir -p ~/.config/google-chrome/${VUE}
 *   mkdir -p ~/.config/google-chrome/${VUE3}
 * elif [ ${OS} == 'win32' ]; then
 *   mkdir -p ~/AppData/Local/Google/Chrome/User\ Data/${VUE}
 *   mkdir -p ~/AppData/Local/Google/Chrome/User\ Data/${VUE3}
 * else
 *   echo "Your platform ($(uname -a)) is not supported."
 *   exit 1
 * fi
 *
 */

import os from 'os';
import path from 'path';

import {
  Devtools,
  Options,
  getExtDir,
  getOptions,
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
  });

  test('test getOptions()', () => {
    const undefinedOptions = getOptions();
    expect(undefinedOptions.browser) === 'google-chrome';
    expect(undefinedOptions.profile) === 'Default';

    const browserOptions = getOptions({
      browser: 'chromium',
      profile: undefined,
    });
    expect(browserOptions.browser) === 'chromium';
    expect(browserOptions.profile) === 'Default';

    const profileOptions = getOptions({ browser: undefined, profile: 'User1' });
    expect(profileOptions.browser) === 'google-chrome';
    expect(profileOptions.profile) === 'User1';
  });

  test('test the arguments', () => {
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
    // Have you checked the version?
    const version = '4.14.0_0';

    const result = await searchDevtools('REACT');
    expect(result).toBe(path.join(present, version));
  });
});

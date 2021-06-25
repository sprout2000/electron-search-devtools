import os from 'os';
import path from 'path';

import {
  Devtools,
  getExtDir,
  whichDevtools,
  searchDevtools,
} from './searchDevtools';

describe('test searchDevtools("REACT")', () => {
  test('test whichDevtools()', () => {
    const jquery = whichDevtools('JQUERY');
    expect(jquery).toBe('/Default/Extensions/dbhhnnnpaeobfddmlalhnehgclcmjimi');
    const angular = whichDevtools('ANGULAR');
    expect(angular).toBe(
      '/Default/Extensions/ienfalfjdbdpebioblfackkekamfmbnh'
    );
    const react = whichDevtools('REACT');
    expect(react).toBe('/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi');
    const redux = whichDevtools('REDUX');
    expect(redux).toBe('/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd');
    const vue = whichDevtools('VUE');
    expect(vue).toBe('/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd');
    const vue3 = whichDevtools('VUE3');
    expect(vue3).toBe('/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg');
    const defaultArg = whichDevtools('' as Devtools);
    expect(defaultArg).toBe(
      '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi'
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
      'You need to select one of the three arguments "REACT", "REDUX", and "VUE".'
    );
    log.mockRestore();
  });

  test('test searchDevtools()', async () => {
    // Are you sure you have installed React devtools?
    const devtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
    const present = path.join(os.homedir(), getExtDir(os.platform()), devtools);
    // Have you checked the version?
    const version = '4.13.5_0';

    const result = await searchDevtools('REACT');
    expect(result).toBe(path.join(present, version));

    const log = jest.spyOn(console, 'log').mockReturnValue();
    // Are you sure you haven't installed Redux devtools?
    await searchDevtools('REDUX');
    expect(log).nthCalledWith(1, 'Error: ENOENT');
    log.mockRestore();
  });
});

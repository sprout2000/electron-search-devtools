import os from 'os';
import path from 'path';

import {
  searchDevtools,
  whichDevtools,
  getExtDir,
  Devtools,
} from './searchDevtools';

describe('searchDevtools("REACT")', () => {
  test('whichDevtools', () => {
    const react = whichDevtools('REACT');
    expect(react).toBe('/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi');
    const redux = whichDevtools('REDUX');
    expect(redux).toBe('/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd');
    const vue = whichDevtools('VUE');
    expect(vue).toBe('/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd');
  });

  test('getExtDir', () => {
    const darwin = getExtDir('darwin');
    expect(darwin).toBe('/Library/Application Support/Google/Chrome');
    const win32 = getExtDir('win32');
    expect(win32).toBe('/AppData/Local/Google/Chrome/User Data');
    const linux = getExtDir('linux');
    expect(linux).toBe('/.config/google-chrome');
  });

  test('invalid arg', () => {
    const log = jest.spyOn(console, 'log').mockReturnValue();
    searchDevtools('APP' as Devtools);
    expect(log).nthCalledWith(
      1,
      'You need to select one of the three arguments "REACT", "REDUX", and "VUE".'
    );
    log.mockRestore();
  });

  test('searchDevtools()', async () => {
    const devtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
    const present = path.join(os.homedir(), getExtDir(os.platform()), devtools);
    const version = '4.13.5_0';

    const result = await searchDevtools('REACT');
    expect(result).toBe(path.join(present, version));
  });
});

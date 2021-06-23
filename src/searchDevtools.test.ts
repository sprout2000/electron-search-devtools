import os from 'os';
import path from 'path';

import { searchDevtools, getExtDir, whichDevtools } from './searchDevtools';

describe('searchDevtools("REACT")', () => {
  test('getExtDir()', () => {
    const darwin = getExtDir('darwin');
    const win32 = getExtDir('win32');
    const linux = getExtDir('linux');
    expect(darwin).toBe('/Library/Application Support/Google/Chrome');
    expect(win32).toBe('/AppData/Local/Google/Chrome/User Data');
    expect(linux).toBe('/.config/google-chrome');
  });

  test('whichDevtools()', () => {
    const react = whichDevtools('REACT');
    const redux = whichDevtools('REDUX');
    const vue = whichDevtools('VUE');
    expect(react).toBe('/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi');
    expect(redux).toBe('/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd');
    expect(vue).toBe('/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd');
  });

  test('searchDevtools()', async () => {
    const present = path.join(getExtDir(os.platform()), whichDevtools('REACT'));
    const version = '4.13.5_0';

    const log = jest.spyOn(console, 'log').mockReturnValue();
    await searchDevtools('REACT');

    expect(log).nthCalledWith(1, path.join(os.homedir(), present, version));
    log.mockRestore();
  });
});

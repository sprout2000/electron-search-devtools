import os from 'os';
import path from 'path';

import { searchDevtools, getExtDir } from './searchDevtools';

describe('searchDevtools("REACT")', () => {
  test('getExtDir', () => {
    const darwin = getExtDir('darwin');
    expect(darwin).toBe('/Library/Application Support/Google/Chrome');
    const win32 = getExtDir('win32');
    expect(win32).toBe('/AppData/Local/Google/Chrome/User Data');
    const linux = getExtDir('linux');
    expect(linux).toBe('/.config/google-chrome');
  });

  test('searchDevtools()', async () => {
    const reactDevtools =
      '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';

    const present = path.join(
      os.homedir(),
      getExtDir(os.platform()),
      reactDevtools
    );
    const version = '4.13.5_0';

    const log = jest.spyOn(console, 'log').mockReturnValue();
    await searchDevtools();

    expect(log).nthCalledWith(1, path.join(present, version));
    log.mockRestore();
  });
});

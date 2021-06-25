var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import os from 'os';
import fs from 'fs';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeGuardArg = (arg) => {
    return (arg !== null &&
        typeof arg === 'string' &&
        (arg === 'JQUERY' ||
            arg === 'ANGULAR' ||
            arg === 'VUE3' ||
            arg === 'VUE' ||
            arg === 'REACT' ||
            arg === 'REDUX'));
};
export const whichDevtools = (arg) => {
    switch (arg) {
        case 'JQUERY':
            return '/Default/Extensions/dbhhnnnpaeobfddmlalhnehgclcmjimi';
        case 'ANGULAR':
            return '/Default/Extensions/ienfalfjdbdpebioblfackkekamfmbnh';
        case 'VUE3':
            return '/Default/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg';
        case 'VUE':
            return '/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd';
        case 'REDUX':
            return '/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd';
        case 'REACT':
            return '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
        default:
            return '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
    }
};
export const getExtDir = (platform) => {
    if (platform === 'darwin') {
        return '/Library/Application Support/Google/Chrome';
    }
    else if (platform === 'win32') {
        return '/AppData/Local/Google/Chrome/User Data';
    }
    else {
        return '/.config/google-chrome';
    }
};
export const searchDevtools = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!typeGuardArg(arg)) {
        console.log('You need to select an argument from the following six choices:\n', '"REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY"');
        return;
    }
    const devtools = whichDevtools(arg);
    const dirPath = path.join(os.homedir(), getExtDir(os.platform()), devtools);
    return fs.promises
        .readdir(dirPath, { withFileTypes: true })
        .then((dirents) => dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift())
        .then((extPath) => {
        return extPath;
    })
        .catch((err) => console.log(`Error: ${err.code}`));
});

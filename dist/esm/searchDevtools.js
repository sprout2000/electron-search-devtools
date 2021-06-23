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
export const whichDevtools = (arg) => {
    if (arg === 'VUE') {
        return '/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd';
    }
    else if (arg === 'REDUX') {
        return '/Default/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd';
    }
    else {
        return '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeGuardArg = (arg) => {
    return (arg !== null &&
        typeof arg === 'string' &&
        (arg === 'VUE' || arg === 'REACT' || arg === 'REDUX'));
};
export const searchDevtools = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!typeGuardArg(arg)) {
        console.log('The argument must be one of "REACT", "REDUX" or "VUE".');
        return;
    }
    const dirPath = path.join(os.homedir(), getExtDir(os.platform()), whichDevtools(arg));
    return fs.promises
        .readdir(dirPath, { withFileTypes: true })
        .then((dirents) => dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift())
        .then((log) => console.log(log))
        .catch((err) => console.log(err));
});

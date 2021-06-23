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
export const searchDevtools = () => __awaiter(void 0, void 0, void 0, function* () {
    const reactDevtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
    const dirPath = path.join(os.homedir(), getExtDir(os.platform()), reactDevtools);
    return fs.promises
        .readdir(dirPath, { withFileTypes: true })
        .then((dirents) => dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path.resolve(dirPath, name))
        .shift())
        .then((extPath) => {
        console.log(extPath);
        return extPath;
    })
        .catch((err) => console.log(err));
});

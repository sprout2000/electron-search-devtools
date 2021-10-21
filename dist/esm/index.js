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
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const typeGuardOptions = (options) => {
    if (options === undefined)
        return true;
    if (typeof options !== 'object')
        return false;
    if (options['profile'] === undefined && options['browser'] === undefined) {
        return false;
    }
    if (typeof options['profile'] === 'string' ||
        options['profile'] === undefined) {
        switch (options['browser']) {
            case undefined:
                return true;
            case 'google-chrome':
                return true;
            case 'chromium':
                return true;
            case 'chromium-snap':
                return true;
            default:
                return false;
        }
    }
    else {
        return false;
    }
};
export const whichDevtools = (arg, profile) => {
    const userProfile = profile || 'Default';
    switch (arg) {
        case 'JQUERY':
            return `/${userProfile}/Extensions/dbhhnnnpaeobfddmlalhnehgclcmjimi`;
        case 'ANGULAR':
            return `/${userProfile}/Extensions/ienfalfjdbdpebioblfackkekamfmbnh`;
        case 'VUE3':
            return `/${userProfile}/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg`;
        case 'VUE':
            return `/${userProfile}/Extensions/nhdogjmejiglipccpnnnanhbledajbpd`;
        case 'REDUX':
            return `/${userProfile}/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd`;
        case 'REACT':
            return `/${userProfile}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`;
        default:
            return `/${userProfile}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`;
    }
};
export const getExtDir = (platform, browser) => {
    if (platform === 'darwin') {
        return '/Library/Application Support/Google/Chrome';
    }
    else if (platform === 'win32') {
        return '/AppData/Local/Google/Chrome/User Data';
    }
    else if (browser === 'chromium-snap') {
        return '/snap/chromium/common/chromium';
    }
    else {
        return `/.config/${browser}`;
    }
};
export const getOptions = (options) => {
    const profile = options ? options.profile || 'Default' : 'Default';
    const browser = options
        ? options.browser || 'google-chrome'
        : 'google-chrome';
    return { profile, browser };
};
export const searchDevtools = (arg, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!typeGuardArg(arg)) {
        console.log('You need to select an argument from the following six choices:\n', '"REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".');
        return;
    }
    if (!typeGuardOptions(options)) {
        console.log('The option should be an object containing the name of the profile or browser.');
        return;
    }
    const providedOptions = getOptions(options);
    const devtools = whichDevtools(arg, providedOptions.profile);
    const devtoolsName = `${arg.charAt(0)}${arg.slice(1).toLowerCase()} Devtools`;
    const dirPath = path.join(os.homedir(), getExtDir(os.platform(), providedOptions.browser), devtools);
    return fs.promises
        .readdir(dirPath, { withFileTypes: true })
        .then((dirents) => dirents
        .filter((dirent) => dirent.isDirectory())
        .filter(({ name }) => name.match(/[0-9]*\.?[0-9]+\.[0-9]+_[0-9]+$/))
        .map(({ name }) => path.resolve(dirPath, name))
        .filter((dirname) => __awaiter(void 0, void 0, void 0, function* () {
        return fs.promises
            .access(`${dirname}${path.sep}manifest.json`)
            .catch(() => console.log(`manifest.json for ${devtoolsName} is not found.`));
    }))
        .pop())
        .then((extPath) => extPath || console.log(`${devtoolsName} is undefined or not found.`))
        .catch(() => console.log(`${devtoolsName} is not found.`));
});

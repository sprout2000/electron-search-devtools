"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDevtools = exports.getOptions = exports.getExtDir = exports.whichDevtools = exports.typeGuardOptions = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
const typeGuardOptions = (options) => {
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
            default:
                return false;
        }
    }
    else {
        return false;
    }
};
exports.typeGuardOptions = typeGuardOptions;
const whichDevtools = (arg, profile) => {
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
exports.whichDevtools = whichDevtools;
const getExtDir = (platform, browser) => {
    if (platform === 'darwin') {
        return '/Library/Application Support/Google/Chrome';
    }
    else if (platform === 'win32') {
        return '/AppData/Local/Google/Chrome/User Data';
    }
    else {
        return `/.config/${browser}`;
    }
};
exports.getExtDir = getExtDir;
const getOptions = (options) => {
    const profile = options ? options.profile || 'Default' : 'Default';
    const browser = options
        ? options.browser || 'google-chrome'
        : 'google-chrome';
    return { profile, browser };
};
exports.getOptions = getOptions;
const searchDevtools = (arg, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!typeGuardArg(arg)) {
        console.log('You need to select an argument from the following six choices:\n', '"REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".');
        return;
    }
    if (!exports.typeGuardOptions(options)) {
        console.log('The option should be an object containing the name of the profile or browser.');
        return;
    }
    const providedOptions = exports.getOptions(options);
    const devtools = exports.whichDevtools(arg, providedOptions.profile);
    const devtoolsName = `${arg.charAt(0)}${arg.slice(1).toLowerCase()} Devtools`;
    const dirPath = path_1.default.join(os_1.default.homedir(), exports.getExtDir(os_1.default.platform(), providedOptions.browser), devtools);
    return fs_1.default.promises
        .readdir(dirPath, { withFileTypes: true })
        .then((dirents) => dirents
        .filter((dirent) => dirent.isDirectory())
        .filter(({ name }) => name.match(/[0-9]*\.?[0-9]+\.[0-9]+_[0-9]+$/))
        .map(({ name }) => path_1.default.resolve(dirPath, name))
        .filter((dirname) => __awaiter(void 0, void 0, void 0, function* () {
        return fs_1.default.promises
            .access(`${dirname}${path_1.default.sep}manifest.json`)
            .catch(() => console.log(`manifest.json for ${devtoolsName} is not found.`));
    }))
        .pop())
        .then((extPath) => extPath || console.log(`${devtoolsName} is undefined or not found.`))
        .catch(() => console.log(`${devtoolsName} is not found.`));
});
exports.searchDevtools = searchDevtools;

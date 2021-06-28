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
exports.searchDevtools = exports.getExtDir = exports.whichDevtools = void 0;
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
const whichDevtools = (arg) => {
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
exports.whichDevtools = whichDevtools;
const getExtDir = (platform) => {
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
exports.getExtDir = getExtDir;
const searchDevtools = (arg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!typeGuardArg(arg)) {
        console.log('You need to select an argument from the following six choices:\n', '"REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".');
        return;
    }
    const devtools = exports.whichDevtools(arg);
    const devtoolsName = `${arg.charAt(0)}${arg.slice(1).toLowerCase()} Devtools`;
    const dirPath = path_1.default.join(os_1.default.homedir(), exports.getExtDir(os_1.default.platform()), devtools);
    return fs_1.default.promises
        .readdir(dirPath, { withFileTypes: true })
        .then((dirents) => dirents
        .filter((dirent) => dirent.isDirectory())
        .filter(({ name }) => name.match(/[0-9]*\.?[0-9]+\.[0-9]+_[0-9]+$/))
        .map(({ name }) => path_1.default.resolve(dirPath, name))
        .filter((dirname) => __awaiter(void 0, void 0, void 0, function* () {
        return yield fs_1.default.promises
            .access(`${dirname}${path_1.default.sep}manifest.json`)
            .catch(() => console.log(`manifest.json for ${devtoolsName} is not found.`));
    }))
        .pop())
        .then((extPath) => extPath || console.log(`${devtoolsName} is undefined.`))
        .catch(() => console.log(`${devtoolsName} is not found.`));
});
exports.searchDevtools = searchDevtools;

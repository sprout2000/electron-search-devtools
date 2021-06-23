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
exports.searchDevtools = exports.getExtDir = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
const searchDevtools = () => __awaiter(void 0, void 0, void 0, function* () {
    const reactDevtools = '/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi';
    const dirPath = path_1.default.join(os_1.default.homedir(), exports.getExtDir(os_1.default.platform()), reactDevtools);
    return fs_1.default.promises
        .readdir(dirPath, { withFileTypes: true })
        .then((dirents) => dirents
        .filter((dirent) => dirent.isDirectory())
        .map(({ name }) => path_1.default.resolve(dirPath, name))
        .shift())
        .then((extPath) => {
        console.log(extPath);
        return extPath;
    })
        .catch((err) => console.log(err));
});
exports.searchDevtools = searchDevtools;

"use strict";var __awaiter=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))((function(i,n){function s(e){try{p(r.next(e))}catch(e){n(e)}}function a(e){try{p(r.throw(e))}catch(e){n(e)}}function p(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,a)}p((r=r.apply(e,t||[])).next())}))},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.searchDevtools=exports.getOptions=exports.getExtDir=exports.whichDevtools=exports.typeGuardOptions=void 0;const os_1=__importDefault(require("os")),fs_1=__importDefault(require("fs")),path_1=__importDefault(require("path")),typeGuardArg=e=>null!==e&&"string"==typeof e&&("JQUERY"===e||"ANGULAR"===e||"VUE3"===e||"VUE"===e||"REACT"===e||"REDUX"===e),typeGuardOptions=e=>{if(void 0===e)return!0;if("object"!=typeof e)return!1;if(void 0===e.profile&&void 0===e.browser)return!1;if("string"!=typeof e.profile&&void 0!==e.profile)return!1;switch(e.browser){case void 0:case"google-chrome":case"chromium":case"chromium-snap":return!0;default:return!1}};exports.typeGuardOptions=typeGuardOptions;const whichDevtools=(e,t)=>{const o=t||"Default";switch(e){case"JQUERY":return`/${o}/Extensions/dbhhnnnpaeobfddmlalhnehgclcmjimi`;case"ANGULAR":return`/${o}/Extensions/ienfalfjdbdpebioblfackkekamfmbnh`;case"VUE3":return`/${o}/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg`;case"VUE":return`/${o}/Extensions/nhdogjmejiglipccpnnnanhbledajbpd`;case"REDUX":return`/${o}/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd`;default:return`/${o}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`}};exports.whichDevtools=whichDevtools;const getExtDir=(e,t)=>"darwin"===e?"/Library/Application Support/Google/Chrome":"win32"===e?"/AppData/Local/Google/Chrome/User Data":"chromium-snap"===t?"/snap/chromium/common/chromium":`/.config/${t}`;exports.getExtDir=getExtDir;const getOptions=e=>({profile:e&&e.profile||"Default",browser:e&&e.browser||"google-chrome"});exports.getOptions=getOptions;const searchDevtools=(e,t)=>__awaiter(void 0,void 0,void 0,(function*(){if(!typeGuardArg(e))throw new Error('You need to select an argument from the following six choices: "REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".');if(!(0,exports.typeGuardOptions)(t))throw new Error("The option should be an object containing the name of the profile or browser.");const o=(0,exports.getOptions)(t),r=(0,exports.whichDevtools)(e,o.profile),i=`${e.charAt(0)}${e.slice(1).toLowerCase()} Devtools`,n=path_1.default.join(os_1.default.homedir(),(0,exports.getExtDir)(os_1.default.platform(),o.browser),r);return fs_1.default.promises.readdir(n,{withFileTypes:!0}).then((e=>e.filter((e=>e.isDirectory())).filter((({name:e})=>e.match(/(?:\d+\.\d+|\d{2,})\.\d+_\d+$/))).map((({name:e})=>path_1.default.resolve(n,e))))).then((e=>{const t=e[e.length-1];if(fs_1.default.existsSync(`${t}${path_1.default.sep}manifest.json`))return t;throw new Error})).catch((()=>{throw new Error(`${i} is not found.`)}))}));exports.searchDevtools=searchDevtools;
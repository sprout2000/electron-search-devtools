var __awaiter=this&&this.__awaiter||function(o,e,r,t){return new(r||(r=Promise))((function(n,i){function a(o){try{c(t.next(o))}catch(o){i(o)}}function s(o){try{c(t.throw(o))}catch(o){i(o)}}function c(o){var e;o.done?n(o.value):(e=o.value,e instanceof r?e:new r((function(o){o(e)}))).then(a,s)}c((t=t.apply(o,e||[])).next())}))};import os from"os";import fs from"fs";import path from"path";const typeGuardArg=o=>null!==o&&"string"==typeof o&&("JQUERY"===o||"ANGULAR"===o||"VUE3"===o||"VUE"===o||"REACT"===o||"REDUX"===o);export const typeGuardOptions=o=>{if(void 0===o)return!0;if("object"!=typeof o)return!1;if(void 0===o.profile&&void 0===o.browser)return!1;if("string"!=typeof o.profile&&void 0!==o.profile)return!1;switch(o.browser){case void 0:case"google-chrome":case"chromium":case"chromium-snap":return!0;default:return!1}};export const whichDevtools=(o,e)=>{const r=e||"Default";switch(o){case"JQUERY":return`/${r}/Extensions/dbhhnnnpaeobfddmlalhnehgclcmjimi`;case"ANGULAR":return`/${r}/Extensions/ienfalfjdbdpebioblfackkekamfmbnh`;case"VUE3":return`/${r}/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg`;case"VUE":return`/${r}/Extensions/nhdogjmejiglipccpnnnanhbledajbpd`;case"REDUX":return`/${r}/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd`;default:return`/${r}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`}};export const getExtDir=(o,e)=>"darwin"===o?"/Library/Application Support/Google/Chrome":"win32"===o?"/AppData/Local/Google/Chrome/User Data":"chromium-snap"===e?"/snap/chromium/common/chromium":`/.config/${e}`;export const getOptions=o=>({profile:o&&o.profile||"Default",browser:o&&o.browser||"google-chrome"});export const searchDevtools=(o,e)=>__awaiter(void 0,void 0,void 0,(function*(){if(!typeGuardArg(o))throw new Error('You need to select an argument from the following six choices: "REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".');if(!typeGuardOptions(e))throw new Error("The option should be an object containing the name of the profile or browser.");const r=getOptions(e),t=whichDevtools(o,r.profile),n=`${o.charAt(0)}${o.slice(1).toLowerCase()} Devtools`,i=path.join(os.homedir(),(a=os.platform(),s=r.browser,"darwin"===a?"/Library/Application Support/Google/Chrome":"win32"===a?"/AppData/Local/Google/Chrome/User Data":"chromium-snap"===s?"/snap/chromium/common/chromium":`/.config/${s}`),t);var a,s;return fs.promises.readdir(i,{withFileTypes:!0}).then((o=>o.filter((o=>o.isDirectory())).filter((({name:o})=>o.match(/(?:\d+\.\d+|\d{2,})\.\d+_\d+$/))).map((({name:o})=>path.resolve(i,o))))).then((o=>{const e=o[o.length-1];if(fs.existsSync(`${e}${path.sep}manifest.json`))return e;throw new Error})).catch((()=>{throw new Error(`${n} is not found.`)}))}));
var __awaiter=this&&this.__awaiter||function(o,e,t,r){return new(t||(t=Promise))((function(n,i){function a(o){try{c(r.next(o))}catch(o){i(o)}}function s(o){try{c(r.throw(o))}catch(o){i(o)}}function c(o){var e;o.done?n(o.value):(e=o.value,e instanceof t?e:new t((function(o){o(e)}))).then(a,s)}c((r=r.apply(o,e||[])).next())}))};import os from"os";import fs from"fs";import path from"path";const typeGuardArg=o=>null!==o&&"string"==typeof o&&("JQUERY"===o||"ANGULAR"===o||"VUE3"===o||"VUE"===o||"REACT"===o||"REDUX"===o);export const typeGuardOptions=o=>{if(void 0===o)return!0;if("object"!=typeof o)return!1;if(void 0===o.profile&&void 0===o.browser)return!1;if("string"!=typeof o.profile&&void 0!==o.profile)return!1;switch(o.browser){case void 0:case"google-chrome":case"chromium":case"edge":return!0;default:return!1}};export const whichDevtools=(o,e)=>{const t=e||"Default";switch(o){case"JQUERY":return`/${t}/Extensions/dbhhnnnpaeobfddmlalhnehgclcmjimi`;case"ANGULAR":return`/${t}/Extensions/ienfalfjdbdpebioblfackkekamfmbnh`;case"VUE3":return`/${t}/Extensions/ljjemllljcmogpfapbkkighbhhppjdbg`;case"VUE":return`/${t}/Extensions/nhdogjmejiglipccpnnnanhbledajbpd`;case"REDUX":return`/${t}/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd`;case"REACT":default:return`/${t}/Extensions/fmkadmapgofadopljbjfkapdkoienihi`}};export const getExtDir=(o,e)=>"darwin"===o?"edge"===e?"/Library/Application Support/Microsoft/Chrome":"/Library/Application Support/Google/Chrome":"win32"===o?"edge"===e?"/AppData/Local/Microsoft/Edge/User Data":"/AppData/Local/Google/Chrome/User Data":`/.config/${e}`;export const getOptions=o=>({profile:o&&o.profile||"Default",browser:o&&o.browser||"google-chrome"});export const searchDevtools=(o,e)=>__awaiter(void 0,void 0,void 0,(function*(){if(!typeGuardArg(o))return void console.log("You need to select an argument from the following six choices:\n",'"REACT", "REDUX", "ANGULAR", "VUE", "VUE3", or "JQUERY".');if(!typeGuardOptions(e))return void console.log("The option should be an object containing the name of the profile or browser.");const t=getOptions(e),r=whichDevtools(o,t.profile),n=`${o.charAt(0)}${o.slice(1).toLowerCase()} Devtools`,i=path.join(os.homedir(),(a=os.platform(),s=t.browser,"darwin"===a?"edge"===s?"/Library/Application Support/Microsoft/Chrome":"/Library/Application Support/Google/Chrome":"win32"===a?"edge"===s?"/AppData/Local/Microsoft/Edge/User Data":"/AppData/Local/Google/Chrome/User Data":`/.config/${s}`),r);var a,s;return fs.promises.readdir(i,{withFileTypes:!0}).then((o=>o.filter((o=>o.isDirectory())).filter((({name:o})=>o.match(/[0-9]*\.?[0-9]+\.[0-9]+_[0-9]+$/))).map((({name:o})=>path.resolve(i,o))).filter((o=>__awaiter(void 0,void 0,void 0,(function*(){return fs.promises.access(`${o}${path.sep}manifest.json`).catch((()=>console.log(`manifest.json for ${n} is not found.`)))})))).pop())).then((o=>o||console.log(`${n} is undefined or not found.`))).catch((()=>console.log(`${n} is not found.`)))}));
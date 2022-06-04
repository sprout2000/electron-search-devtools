export declare type Options = {
    profile?: string;
    browser?: 'google-chrome' | 'chromium';
};
export declare type Devtools = 'JQUERY' | 'ANGULAR' | 'VUE' | 'VUE3' | 'REACT' | 'REDUX';
export declare const typeGuardOptions: (options: any) => options is Options;
export declare const whichDevtools: (arg: Devtools) => "dbhhnnnpaeobfddmlalhnehgclcmjimi" | "ienfalfjdbdpebioblfackkekamfmbnh" | "ljjemllljcmogpfapbkkighbhhppjdbg" | "nhdogjmejiglipccpnnnanhbledajbpd" | "lmhkpmbekcpmknklioeibfkpmmfibljd" | "fmkadmapgofadopljbjfkapdkoienihi" | "";
export declare const getOptions: (options?: Options) => Options;
export declare const getExtDir: (platform: string, options?: Options) => string;
export declare const searchDevtools: (arg: Devtools, options?: Options) => Promise<string>;
//# sourceMappingURL=index.d.ts.map
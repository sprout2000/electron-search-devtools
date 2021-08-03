export interface Options {
    profile?: string;
    browser?: 'google-chrome' | 'chromium' | 'edge';
}
export declare type Devtools = 'JQUERY' | 'ANGULAR' | 'VUE' | 'VUE3' | 'REACT' | 'REDUX';
export declare const typeGuardOptions: (options: any) => options is Options;
export declare const whichDevtools: (arg: Devtools, profile: Options['profile']) => string;
export declare const getExtDir: (platform: string, browser: Options['browser']) => string;
export declare const getOptions: (options?: Options | undefined) => Options;
export declare const searchDevtools: (arg: Devtools, options?: Options | undefined) => Promise<string | void>;
//# sourceMappingURL=index.d.ts.map
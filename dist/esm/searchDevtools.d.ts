export declare type Devtools = 'JQUERY' | 'ANGULAR' | 'VUE' | 'VUE3' | 'REACT' | 'REDUX';
export declare const whichDevtools: (arg: Devtools) => string;
export declare const getExtDir: (platform: string) => string;
export declare const searchDevtools: (arg: Devtools) => Promise<string | void | undefined>;
//# sourceMappingURL=searchDevtools.d.ts.map
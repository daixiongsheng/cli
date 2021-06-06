export default class Template {
    fileMapping: any;
    registryUrl: string;
    pkgName: string;
    options: any;
    constructor(options: any);
    run(appConfig: any): Promise<void>;
    processFiles(targetDir: string, templateDir: string, appConfig: any): Promise<any>;
    getPackageInfo(): Promise<any>;
    downloadBoilerplate(): Promise<any>;
    curl(url: any, config: any): Promise<any>;
}

export interface Options {
    projectName: string;
}
export default class Base {
    pwd: string;
    options: Options;
    projectName: string;
    constructor(options: Options);
    checkProject(): Promise<void>;
    exec(...args: any[]): any;
}

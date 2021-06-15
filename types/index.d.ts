/**
 * @file index 入口
 * @author wangjun03@baijia.com
 */
declare const dxsCli: {
    /**
     * 当前版本号
     *
     * @type string
     */
    version: any;
    /**
     * midwayjs项目
     */
    serve(projectName: any): void;
    /**
     * 创建一个库
     */
    lib(projectName: any): void;
    /**
     * 新建serverless项目
     */
    serverless(projectName: any): void;
    /**
     * 创建一个 vue 项目的项目
     */
    vue(projectName: any): void;
    /**
     * 创建一个 vue3 项目的项目
     */
    vue3(projectName: any): void;
    /**
     * 创建一个 react 项目的项目
     */
    react(projectName: any): void;
    /**
     * 创建一个 react 移动端项目
     */
    reactM(projectName: any): void;
};
export default dxsCli;

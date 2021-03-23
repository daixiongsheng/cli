/**
 * @file index 入口
 * @author wangjun03@baijia.com
 */

import Midway from './midway';

const dxsCli = {
    /**
     * 当前版本号
     *
     * @type string
     */
    version: require('../package.json').version,

    /**
     * init 初始化项目
     */
    async serve(projectName) {
        Midway.exec({projectName});
    },

};

export default dxsCli;
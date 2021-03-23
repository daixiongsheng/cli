

import {existsSync, mkdirSync} from 'fs';
import {prompt} from 'inquirer';
import logger from './logger'
import Template from './template';

interface AppConfig {
    name: string;
    description: string;
    author: string;
    mysql: boolean;
    redis: boolean;
    kafka: boolean;
}

const pwd = process.cwd();
export default class Midway {

    static async exec(options: any) {
        const {projectName} = options;
        const dir = `${pwd}/${projectName}`;
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }

        // 问答模式生成配置
        const appConfig: AppConfig = {} as AppConfig;

        const {redis, mysql, kafka} = await prompt([
            {
                type: 'input',
                name: 'name',
                message: 'app name',
                default: projectName,
                validate: (input: string) => {
                    // app名称支持数字、字母、-、_
                    const isValid = !!input.match(/^[-\w]{2,100}$/)
                    if (!isValid) {
                        logger.log('Sorry, app name is invalid!');
                    }
                    return isValid;
                },
                filter: (name: string) => {
                    appConfig.name = name || projectName;
                    return appConfig.name;
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'description',
                default: 'a midway app',
                filter: (description: string) => {
                    appConfig.description = description || 'a melonjs app';
                    return appConfig.description;
                }
            },
            {
                type: 'input',
                name: 'author',
                message: 'author',
                default: 'daixiongsheng',
                filter: (author: string) => {
                    appConfig.author = author || '';
                    return appConfig.author;
                }
            },
            {
                type: 'confirm',
                name: 'mysql',
                message: 'would you need MySql?',
                default: true
            },
            {
                type: 'confirm',
                name: 'redis',
                message: 'would you need Redis?',
                default: true
            },
            {
                type: 'confirm',
                name: 'kafka',
                message: 'would you need Kafka?',
                default: false
            },
        ]);

        appConfig.mysql = mysql;
        appConfig.redis = redis;
        appConfig.kafka = kafka;

        // 下载模板
        const template = new Template({
            pkgName: 'dxs-midway',
            dir
        });
        await template.run(appConfig);
    }
}
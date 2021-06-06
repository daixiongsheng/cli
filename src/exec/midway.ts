import { mkdirSync } from 'fs'
import { prompt } from 'inquirer'
import logger from '../logger'
import Template from '../template'
import Base from './base'

interface AppConfig {
  name: string
  description: string
  author: string
  mysql: boolean
  redis: boolean
  kafka: boolean
}

export default class Midway extends Base {
  async exec() {
    await this.checkProject()
    const { projectName } = this.options
    const dir = `${this.pwd}/${projectName}`
    mkdirSync(dir)

    const appConfig: AppConfig = {} as AppConfig

    const { redis, mysql } = await prompt([
      {
        type: 'input',
        name: 'name',
        message: 'project name',
        default: projectName,
        validate: (input: string) => {
          // app名称支持数字、字母、-、_
          const isValid = !!input.match(/^[-\w]{2,100}$/)
          if (!isValid) {
            logger.log('Sorry, app name is invalid!')
          }
          return isValid
        },
        filter: (name: string) => {
          appConfig.name = name || projectName
          return appConfig.name
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'description',
        default: 'a midway app',
        filter: (description: string) => {
          appConfig.description = description || 'a midway app'
          return appConfig.description
        },
      },
      {
        type: 'input',
        name: 'author',
        message: 'author',
        default: 'XiongSheng Dai',
        filter: (author: string) => {
          appConfig.author = author || ''
          return appConfig.author
        },
      },
      {
        type: 'confirm',
        name: 'mysql',
        message: 'would you need MySql?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'redis',
        message: 'would you need Redis?',
        default: true,
      },
    ])

    appConfig.mysql = mysql
    appConfig.redis = redis

    // 下载模板
    const template = new Template({
      pkgName: 'dxs-midway',
      dir,
    })
    await template.run(appConfig)
  }
}

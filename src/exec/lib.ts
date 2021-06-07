import Base from './base'
import { mkdirSync } from 'fs'
import Template from '../template'

export default class Lib extends Base {
  async exec() {
    await this.checkProject()
    const { projectName } = this.options
    const dir = `${this.pwd}/${projectName}`
    mkdirSync(dir)

    // 下载模板
    const template = new Template({
      pkgName: 'lib-template',
      dir,
    })
    await template.run({})
  }
}

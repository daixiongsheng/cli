import { execSync } from 'child_process'
import { prompt } from 'inquirer'
import fs from 'fs'
import path from 'path'
export interface Options {
  projectName: string
}
export default class Base {
  pwd = process.cwd()
  options: Options
  projectName: string

  constructor(options: Options) {
    this.options = options
    this.projectName = options.projectName
  }

  async checkProject(): Promise<void> {
    const dir = path.resolve(this.pwd, this.projectName)
    if (fs.existsSync(dir)) {
      const { overwrite } = await prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          default: false,
          message: `${this.projectName} already exists, overwrite it:`,
        },
      ])
      if (overwrite) {
        execSync(`rm -rf ${dir}`)
      } else {
        process.exit(0)
      }
    }
  }

  exec(...args: any[]): any {
    console.log('command not supported')
  }
}

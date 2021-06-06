const fs = require('fs')
const path = require('path')
const os = require('os')
const glob = require('glob')
const mkdirp = require('mkdirp')
const axios = require('axios')
const rimraf = require('mz-modules/rimraf')
const compressing = require('compressing')
export default class Template {
  fileMapping: any
  registryUrl: string
  pkgName: string
  options: any
  constructor(options: any) {
    this.options = options
    this.registryUrl = 'https://registry.npmjs.com'
    this.pkgName = options.pkgName
    this.fileMapping = {
      _gitignore: '.gitignore',
    }
  }

  async run(appConfig: any) {
    const templateDir = await this.downloadBoilerplate()
    const targetDir = path.join(this.options.dir)
    await this.processFiles(targetDir, templateDir, appConfig)
  }

  async processFiles(targetDir: string, templateDir: string, appConfig: any) {
    const src = path.join(templateDir)
    const files = glob.sync('**/*', {
      cwd: src,
      dot: true,
      onlyFiles: false,
      followSymlinkedDirectories: false,
    })
    files.forEach((file) => {
      const { dir: dirname, base: basename } = path.parse(file)
      const from = path.join(src, file)
      const name = path.join(dirname, this.fileMapping[basename] || basename)
      const to = path.join(targetDir, name)
      const stats = fs.lstatSync(from)
      if (stats.isSymbolicLink()) {
        const target = fs.readlinkSync(from)
        fs.symlinkSync(target, to)
      } else if (stats.isDirectory()) {
        mkdirp.sync(to)
      } else if (stats.isFile()) {
        let content = fs.readFileSync(from, 'utf8')
        fs.writeFileSync(to, content, 'utf8')
      } else {
        console.log(`ignore ${file} only support file, dir, symlink`)
      }
    })
    return files
  }

  async getPackageInfo() {
    try {
      const result = await this.curl(`${this.registryUrl}/${this.pkgName}`, {
        responseType: 'json',
        maxRedirects: 5,
        timeout: 5000,
      })
      return result.data
    } catch (err) {
      throw err
    }
  }
  async downloadBoilerplate() {
    const result = await this.getPackageInfo()
    const tgzUrl = result.versions[result['dist-tags'].latest].dist.tarball
    const saveDir = path.join(os.tmpdir(), 'init-boilerplate')
    await rimraf(saveDir)
    const response = await this.curl(tgzUrl, { responseType: 'stream' })
    await compressing.tgz.uncompress(response.data, saveDir)
    return path.join(saveDir, '/package')
  }
  async curl(url, config) {
    return axios.default.get(url, config)
  }
}

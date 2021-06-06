import { Console } from 'console'
import { blue, red, yellow } from 'chalk'
const pkg = require('../package.json')
const console = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
})

const prefix = pkg.name + ':'

const writeLog = (...args: any[]) => {
  console.log(...args)
}

export default {
  info(...messages: any[]) {
    writeLog(blue(prefix), ...messages)
  },

  error(...messages: any[]) {
    writeLog(red(prefix), ...messages)
  },

  warn(...messages: any[]) {
    writeLog(yellow(prefix), ...messages)
  },

  log(...messages: any[]) {
    writeLog(...messages)
  },
}

import { Command } from 'commander'
import dxsCli from '.'

const program = new Command()

program
  .version(dxsCli.version, '-v, --version', 'Output the current version.')
  .usage('<command> [options]')
  .helpOption('-h, --help', 'Output usage information.')
  .addHelpCommand('help [command]', 'Display help for command.')
  .on('--help', () => {
    console.log(`Examples:
    $ dxs-cli serve projectName  创建一个midwayjs的项目
    $ dxs-cli lib projectName  新建一个库
    $ dxs-cli serverless projectName  新建serverless项目
    $ dxs-cli vue projectName  创建一个 vue 项目的项目
    $ dxs-cli vue3 projectName  创建一个 vue3 项目的项目
    $ dxs-cli react projectName  创建一个 react 项目的项目
`)
  })

program
  .command('serve <projectName>')
  .alias('s')
  .description('创建一个midwayjs的项目')
  .usage('<projectName>')
  .action((projectName) => dxsCli.serve(projectName))

program
  .command('lib <projectName>')
  .alias('l')
  .description('新建一个库')
  .usage('<projectName>')
  .action((projectName) => dxsCli.lib(projectName))

program
  .command('serverless <projectName>')
  .description('新建serverless项目')
  .usage('<projectName>')
  .action((projectName) => dxsCli.serverless(projectName))

program
  .command('vue <projectName>')
  .description('创建一个 vue 项目的项目')
  .usage('<projectName>')
  .action((projectName) => dxsCli.vue(projectName))

program
  .command('vue3 <projectName>')
  .description('创建一个 vue3 项目的项目')
  .usage('<projectName>')
  .action((projectName) => dxsCli.vue3(projectName))

program
  .command('react <projectName>')
  .description('创建一个 react 项目的项目')
  .usage('<projectName>')
  .action((projectName) => dxsCli.react(projectName))

program.parse(process.argv)

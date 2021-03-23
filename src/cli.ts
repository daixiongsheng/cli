import {Command} from 'commander';
import dxsCli from '.';

const program = new Command();


program
    .version(dxsCli.version, '-v, --version', 'Output the current version.')
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output usage information.')
    .addHelpCommand('help [command]', 'Display help for command.')
    .on('--help', () => {
        console.log(`Examples:
    $ dxs-cli serve projectName
`)
    });

program
    .command('serve <projectName>')
    .alias('c')
    .description('Create a new app with midwayjs.')
    .usage('<projectName>')
    .action((projectName, opts) => dxsCli.serve(projectName));

program.parse(process.argv);
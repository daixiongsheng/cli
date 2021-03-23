/**
 * logger.ts
 *
 * @author wangjun03@baijia.com
 */
import {Console} from 'console';
import {blue, red, yellow} from 'chalk';

const console = new Console({
    stdout: process.stdout,
    stderr: process.stderr
});

const prefix = 'dxs-cli:';

const writeLog = (...args: any[]) => {
    console.log(...args);
};

export default {
    info(...messages: any[]) {
        writeLog(blue(prefix), ...messages);
    },

    error(...messages: any[]) {
        writeLog(red(prefix), ...messages);
    },

    warn(...messages: any[]) {
        writeLog(yellow(prefix), ...messages);
    },

    log(...messages: any[]) {
        writeLog(...messages);
    }
};
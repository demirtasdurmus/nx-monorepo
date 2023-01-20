import { format, Logform } from 'winston';
import { blue, cyan, green, red, yellow, grey, magenta } from '@colors/colors/safe';

export const nestConsoleFormat = (appName: string): Logform.Format =>
    format.printf(({ context, level, timestamp, message, trace }) => {
        let color = green;

        switch (level) {
            case 'info':
                color = green;
                break;
            case 'warn':
                color = yellow;
                break;
            case 'error':
                color = red;
                break;
            case 'debug':
                color = blue;
                break;
            case 'verbose':
                color = cyan;
                break;
            default:
                color = green;
                break;
        }

        return (
            `${color(`[${appName}]`)} ` +
            `${color(level.charAt(0).toUpperCase() + level.slice(1))}\t` +
            ('undefined' !== typeof timestamp ? grey(`${new Date(timestamp).toLocaleString()} `) : '') +
            ('undefined' !== typeof context ? `${magenta('[' + context + ']')} ` : '') +
            `${color(message.trimEnd())} ` +
            ('undefined' !== typeof trace ? `\n${trace}` : '')
        );
    });

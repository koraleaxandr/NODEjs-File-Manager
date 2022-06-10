import { pipeline, Transform } from 'stream';
import process, { stdin, stdout } from 'process';

import { pathToWorkingDirectory, getCurrentPath } from './createDirPath.js';
import { messages } from './messages.js';

export const commandsListener = async () => {
    console.log(messages.currentPathMessage(pathToWorkingDirectory));
    const input = stdin;
    const output = stdout;
    const decode = new Transform({
        transform(chunk, encoding, callback) {            
            chunk = chunk.toString();
            // console.log(chunk);
            const res =  getUserCommand(chunk);
          callback(null, (' '));
        },
      });
    pipeline(
        input,
        decode,
        output,
        err => {
            if (err) {
                console.log('operation failed');
            }
        }
    );    
};

const getUserCommand = async (commandString) => {
    const commandArray = commandString.split(' ');
    // console.log(commandArray);
    switch (commandArray[0]) {
        case 'up\r\n':
        case 'cd\r\n':
        case 'cd':
        case 'ls\r\n':
           return await getCurrentPath(commandArray);
           case 'cat':
           return await getCurrentPath(commandArray);            
        default:
            console.log(messages.invalidInputMessage);
            break;
    }
}
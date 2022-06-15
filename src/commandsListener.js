import { pipeline, Transform } from 'stream';
import process, { stdin, stdout } from 'process';
import path from 'path';
import util from 'util';

import { userName } from './index.js';
import { pathToWorkingDirectory, getCurrentPath } from './createDirPath.js';
import { messages } from './messages.js';
import { createFile } from './fs/create.js';
import { renameFile } from './fs/rename.js';
import { copyFile } from './fs/copyFile.js';
import { removeFile } from './fs/delete.js';
import { calculateHash } from './hash/calcHash.js';
import { parseEnv } from './os/env.js';
import { compressFile } from './zip/compress.js';
import { decompressFile } from './zip/decompress.js';

export const commandsListener = async () => {
    console.log(messages.currentPathMessage(pathToWorkingDirectory));
    const input = stdin;
    const output = stdout;
    const decode = new Transform({
        transform(chunk, encoding, callback) {
            chunk = chunk.toString();
            const res = getUserCommand(chunk);
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
    console.log('42 ' + commandString);
    const commandArray = commandString.trim().split(' ');
    let [command, ...args] = commandString.trim().split(' ');
    if (commandString.includes('\'') || commandString.includes('\"')) {
        args = args.join(' ').split(/["'] | ["']/)
        .map((arg) => arg.replaceAll('\'', ''))
        .map((arg) => arg.replaceAll('\"', ''));
    }
            const pathToFile = args.length ?
            getEnteredPath(args[0]) : '';
            const targetFolder = args.length > 1 ?
            (getEnteredPath(args[1])) :
            pathToWorkingDirectory;
    switch (command) {
        case 'up':
        case 'cd':
        case 'ls':
            return await getCurrentPath([command, ...args]);
        case 'cat':
            return await getCurrentPath(commandArray);
        case 'add':
            return await createFile(pathToWorkingDirectory, args[0]);
        case 'rn':
            const pathToFileArray = args.slice(0, (args.length - 1));
            const pathToFile = getEnteredPath(pathToFileArray.join(' '));
            return await renameFile(pathToFile, args[args.length - 1]);
        case 'cp':            
            return await copyFile(pathToFile, targetFolder, false);
        case 'mv':
            return await copyFile(pathToFile, targetFolder, true);
        case 'rm':
            const pathToDeletingFile = getEnteredPath(args.join(' ') );
            return await removeFile(pathToDeletingFile);
        case 'hash':
            const pathToHashingFile = getEnteredPath(args.join(' ') );
            return await calculateHash(pathToHashingFile);
        case 'os':
            const argument = commandArray[1].replace('--', '') ;
            parseEnv(argument);
            break;
        case 'compress':
            return await compressFile(pathToFile, targetFolder);
        case 'decompress':
                return await decompressFile(pathToFile, targetFolder);
        case '.exit':
            console.log(messages.closeAppMessage(userName));
            process.exit(1);
        default:
            console.error(messages.invalidInputMessage);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
            break;
    }
}

export const getEnteredPath = (pathString) => {
    if (!path.isAbsolute(pathString)) {
        return pathString = path.resolve(pathToWorkingDirectory, pathString);
    } else return pathString = path.resolve(pathString);
}
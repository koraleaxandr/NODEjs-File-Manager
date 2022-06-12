import { pipeline, Transform } from 'stream';
import process, { stdin, stdout } from 'process';
import path from 'path';

import { pathToWorkingDirectory, getCurrentPath } from './createDirPath.js';
import { messages } from './messages.js';
import { createFile } from './fs/create.js';
import { renameFile } from './fs/rename.js';
import { copyFile } from './fs/copyFile.js';
import { removeFile } from './fs/delete.js';
import { calculateHash } from './hash/calcHash.js';

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
    const commandArray = commandString.split(' ');
    switch (commandArray[0]) {
        case 'up\r\n':
        case 'cd\r\n':
        case 'cd':
        case 'ls\r\n':
            return await getCurrentPath(commandArray);
        case 'cat':
            return await getCurrentPath(commandArray);
        case 'add':
            return await createFile(pathToWorkingDirectory, commandArray[1].slice(0, -2));
        case 'rn':
            const pathToFileArray = commandArray.slice(1, (commandArray.length - 1));
            const pathToFile = getEnteredPath(pathToFileArray.join(' '));
            return await renameFile(pathToFile, commandArray[commandArray.length - 1]);
        case 'cp':
            const pathToCopiedFileArray = commandArray.slice(1, (commandArray.length - 1));
            const pathToCopiedFile = getEnteredPath(pathToCopiedFileArray.join(' '));
            const targetFolder = (getEnteredPath(commandArray[commandArray.length - 1].slice(0, -2)));
            return await copyFile(pathToCopiedFile, targetFolder, false);
        case 'mv':
            const pathToMovedFileArray = commandArray.slice(1, (commandArray.length - 1));
            const pathToMovedFile = getEnteredPath(pathToMovedFileArray.join(' '));
            const targetMovingFolder = (getEnteredPath(commandArray[commandArray.length - 1].slice(0, -2)));
            return await copyFile(pathToMovedFile, targetMovingFolder, true);
        case 'rm':
            commandArray.shift();
            const pathToDeletingFile = getEnteredPath(commandArray.join(' ').slice(0, -2));
            console.log(pathToDeletingFile);
            return await removeFile(pathToDeletingFile);
        case 'hash':
            commandArray.shift();
            const pathToHashingFile = getEnteredPath(commandArray.join(' ').slice(0, -2));
            return await calculateHash(pathToHashingFile);
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
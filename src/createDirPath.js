import path from 'path';
import process from 'process';
import * as fs from 'fs/promises';

const homeDirectory = process.env.HOME;
export const currentPath = '';
export let pathToWorkingDirectory =
    homeDirectory;

export const getCurrentPath = (commandArray) => {
    let newPath = '';
    const pathArray = pathToWorkingDirectory.split('\\');
    console.log(pathArray.toString().replaceAll(',', '\\'));
    switch (commandArray[0]) {
        case 'up\r\n':
            const newPathArray = pathArray.length > 1 ? pathArray.slice(0, -1) : pathArray;
            newPath = path.join(...newPathArray);
            break;
            case 'cd':
                if (commandArray[1].startsWith('./')) {
                    newPath = path.join(...pathArray, commandArray[1]);
                } else newPath = commandArray[1];
            
            break;
            case 'cd\r\n':
                newPath = pathToWorkingDirectory;
            break;
        default:
            break;
    }
    pathToWorkingDirectory = newPath;
    console.log(pathToWorkingDirectory);
}
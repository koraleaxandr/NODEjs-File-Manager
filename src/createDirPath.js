import path from 'path';
import process from 'process';
import * as fs from 'fs/promises';

import { messages } from './messages.js';
import { Dir } from 'fs';

const homeDirectory = process.env.HOME;
export const currentPath = '';
export let pathToWorkingDirectory =
    homeDirectory;

export const getCurrentPath = async(commandArray) => {
    let newPath = '';
    const pathArray = pathToWorkingDirectory.split('\\');
    console.log(pathArray.toString());
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
                newPath = path.dirname(pathToWorkingDirectory);
            break;
        default:
            break;
    }
    try {
        console.log(newPath);
        const res = await fs.opendir(path.dirname(newPath));
        console.log(res);
        if (typeof res !== Error) {
            pathToWorkingDirectory = newPath;       
        }        
    } catch (error) { 
        //console.log(error);   
        console.log(messages.operationFailedMessage);
    } 
    console.log(pathToWorkingDirectory);
}
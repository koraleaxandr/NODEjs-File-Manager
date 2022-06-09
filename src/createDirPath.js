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
    const commandPathArray = commandArray.slice(1);
    const commandPath = commandPathArray.join(' ');
    switch (commandArray[0]) {
        case 'up\r\n':
            const newPathArray = pathArray.length > 1 ? pathArray.slice(0, -1) : pathArray;
            newPath = path.join(...newPathArray);
            break;
            case 'cd':
                if (!path.isAbsolute(commandPath)) {
                    newPath = path.join( ...pathArray, commandPath.slice(0, -2));
                } else newPath = path.join(commandPath.slice(0, -2));
            
            break;
            case 'cd\r\n':
                newPath = (pathToWorkingDirectory);
            break;
        default:
            break;
    }
    try {
        newPath = path.normalize(newPath).replace('.', '/');
        const res = await fs.readdir(newPath);
        if (typeof res !== Error) {
            pathToWorkingDirectory = newPath; 
            return  pathToWorkingDirectory;     
        }        
    } catch (error) { 
        console.log(error);   
        console.log(messages.operationFailedMessage);
        return error;
    } 
    console.log(pathToWorkingDirectory);
}
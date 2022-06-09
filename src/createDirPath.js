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
            console.log('up' + newPath);
            break;
            case 'cd':
                if (!path.isAbsolute(commandArray[1])) {
                    newPath = path.join( ...pathArray, commandArray[1]);
                } else newPath = path.join(commandArray[1]);
            
            break;
            case 'cd\r\n':
                newPath = (pathToWorkingDirectory);
                console.log('cd ' + newPath);
            break;
        default:
            break;
    }
    try {
        newPath = path.normalize(newPath) + '';
        console.log('try ' + newPath +'xx');
        const res = await fs.readdir(newPath);
        console.log(res);
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
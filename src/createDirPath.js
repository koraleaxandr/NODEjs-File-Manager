import path from 'path';
import process from 'process';
import * as fs from 'fs/promises';

import { messages } from './messages.js';
import { readFile } from './fs/read.js'

const homeDirectory = process.env.HOME;
export let pathToWorkingDirectory =
    homeDirectory;

export const getCurrentPath = async(commandArray) => {
    let newPath = '';
    const pathArray = pathToWorkingDirectory.split('\\');
    const commandPathArray = commandArray.slice(1);
    const commandPath = commandPathArray.join(' ');
    switch (commandArray[0]) {
        case 'up\r\n':
            const newPathArray = pathArray.length > 1 ? pathArray.slice(0, -1) : process.env.HOMEDRIVE;
            newPath = path.join(...newPathArray);
            break;
            case 'cd':
                if (!path.isAbsolute(commandPath)) {
                    newPath = path.join( ...pathArray, commandPath.slice(0, -2));
                } else newPath = path.join(commandPath.slice(0, -2));            
            break;
            case 'cd\r\n':
            case 'ls\r\n':
                newPath = (pathToWorkingDirectory);
            break;
            case 'cat':
                newPath = (pathToWorkingDirectory);
                if (!path.isAbsolute(commandPath)) {
                    const pathToFile = path.join( ...pathArray, commandPath.slice(0, -2));
                    await readFile(pathToFile);
                } else {
                    const pathToFile = path.join(commandPath.slice(0, -2));
                    await readFile(pathToFile);
                }                
            break;
        default:
            break;
    }
    try {
        newPath = path.normalize(newPath).replace('.', '/');
        const res = await fs.readdir(newPath, {withFileTypes : true});
        if (typeof res !== Error) {
            if (commandArray[0] === 'ls\r\n') {
                console.log(res);
            }
            pathToWorkingDirectory = newPath;
            console.log(messages.currentPathMessage(pathToWorkingDirectory)); 
            return  pathToWorkingDirectory;     
        }        
    } catch (error) { 
        //console.log(error);   
        console.log(messages.operationFailedMessage);
        console.log(messages.currentPathMessage(pathToWorkingDirectory));
        return error;
    } 
    
}
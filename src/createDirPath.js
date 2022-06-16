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
    const commandPath = commandPathArray.length ?
    commandPathArray.join(' ') :
    null;
    switch (commandArray[0]) {
        case 'up':
            const newPathArray = pathArray.length > 1 ? pathArray.slice(0, -1) : pathArray;
            newPath = path.join(...newPathArray);
            break;
            case 'cd':
                if (commandPath) {
                if (!path.isAbsolute(commandPath)) {
                    newPath = path.join( ...pathArray, commandPath );
                } else newPath = path.join(commandPath );
            } else  newPath = (pathToWorkingDirectory);           
            break;
            case 'ls':
                newPath = (pathToWorkingDirectory);
            break;
            case 'cat':
                newPath = (pathToWorkingDirectory);
                if (commandPath) {
                if (!path.isAbsolute(commandPath)) {
                    const pathToFile = path.join( ...pathArray, commandPath );
                    await readFile(pathToFile);
                } else {
                    const pathToFile = path.join(commandPath );
                    await readFile(pathToFile);
                }
            } else console.error(messages.invalidInputMessage);            
            break;
        default:
            break;
    }
    try {
        newPath = path.normalize(newPath).replace('.', '/');
        const res = await fs.readdir(newPath, {withFileTypes : true});
        if (typeof res !== Error) {
            if (commandArray[0] === 'ls') {
                console.table(res);
            }
            pathToWorkingDirectory = newPath;
            console.log(messages.currentPathMessage(pathToWorkingDirectory)); 
            return  pathToWorkingDirectory;     
        }        
    } catch (error) { 
        // console.log(error);   
        console.log(messages.operationFailedMessage);
        console.log(messages.currentPathMessage(pathToWorkingDirectory));
        return error;
    } 
    
}
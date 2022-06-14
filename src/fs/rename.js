import fs from 'fs/promises';
import path from 'path';

import { messages } from '../messages.js';
import { pathToWorkingDirectory } from '../createDirPath.js';

export const renameFile = async (pathString, newFilename) => {
    newFilename = path.join(path.dirname(pathString), path.basename(newFilename)) ;
    console.log(pathString);
    console.log(newFilename);

    try {
        await fs.realpath(`${path.dirname(normPathString)}/${newFilename}`);
        console.log(messages.operationFailedMessage);
        console.log(messages.currentPathMessage(pathToWorkingDirectory));
        return;
    } catch (error) {    
         try {            
            await fs.rename(pathString, newFilename);
            console.log(`File ${pathString} renamed to ${newFilename}`);
                console.log(messages.currentPathMessage(pathToWorkingDirectory));
                return;
        } catch (error) {
            console.error(messages.operationFailedMessage);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
        }
        
    }
};

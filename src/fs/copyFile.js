import fs from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

import { messages } from '../messages.js';
import { pathToWorkingDirectory } from '../createDirPath.js';

export const copyFile = async (pathString, targetFolder, removeOriginal) => {
    targetFolder = path.normalize(targetFolder);
    const fileName = path.basename(pathString);
    try {
        await fs.mkdir(targetFolder, { recursive: false })
    } catch (error) {}

         try {            
            await fs.copyFile(path.resolve(pathString), path.join(targetFolder, fileName), constants.COPYFILE_EXCL);
            if (!removeOriginal) {
            console.log(`File ${fileName} copied to ${targetFolder}`);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
            } else {
                try {
                await fs.rm(path.resolve(pathString));
                console.log(`File ${fileName} moved to ${targetFolder}`);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
            } catch (error) {
                console.error(messages.operationFailedMessage + error);
                console.log(messages.currentPathMessage(pathToWorkingDirectory));
            }
        }        
        } catch (error) {
            console.error(messages.operationFailedMessage + error);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
        }        
   
};

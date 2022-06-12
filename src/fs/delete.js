import fs from 'fs/promises';
import path from 'path';

import { messages } from '../messages.js';
import { pathToWorkingDirectory } from '../createDirPath.js';

export const removeFile = async (pathString) => {
    const fileName = path.basename(pathString);
    const fileFolder = path.dirname(pathString);
    try {
        await fs.rm(pathString)
        console.log(`File ${fileName} delete from ${fileFolder}`);
        console.log(messages.currentPathMessage(pathToWorkingDirectory));
    } catch (error) {
        console.log(messages.operationFailedMessage + error);
        console.log(messages.currentPathMessage(pathToWorkingDirectory));
    }
};

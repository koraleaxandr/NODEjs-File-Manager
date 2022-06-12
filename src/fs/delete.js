import * as fs from 'fs/promises';

import { messages } from '../messages.js';

export const removeFile = async (pathString) => {
    const fileName = path.basename(pathString);
    try {
        await fs.rm(pathString)
        console.log(`File ${fileName} delete from ${targetFolder}`);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
    } catch (error) {
        console.log(messages.operationFailedMessage);
        console.log(messages.currentPathMessage(pathToWorkingDirectory));
    }
};

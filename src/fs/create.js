import * as fs from 'fs/promises';
import path from 'path';

import { messages } from '../messages.js';

export const createFile = async (pathToWorkingDirectory, fileName) => {
    fileName = path.basename(fileName)
    const pathString = path.resolve(pathToWorkingDirectory, fileName);
    console.log(pathString);
    try {
        await fs.writeFile(pathString,
            '', {
                flag: 'ax'
            });
            console.log(`File ${fileName} added to ${pathToWorkingDirectory}`);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
    } catch (error) {
        console.error(messages.operationFailedMessage);
        console.log(messages.currentPathMessage(pathToWorkingDirectory));
    };
};

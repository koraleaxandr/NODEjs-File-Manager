import * as fs from 'fs/promises';

import { messages } from '../messages.js';

export const createFile = async (pathToWorkingDirectory, fileName) => {
    const pathString = `${pathToWorkingDirectory}/${fileName}`;
    try {
        await fs.writeFile(pathString,
            '', {
                flag: 'ax'
            });
            console.log(`File ${fileName} added to ${pathToWorkingDirectory}`);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
    } catch (error) {
        console.error(messages.operationFailedMessage);
    };
};

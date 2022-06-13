import * as fs from 'fs/promises';

import { messages } from '../messages.js';

export const readFile = async (pathToFile) => {
    try {
     const file =  await fs.readFile(pathToFile, {encoding: 'utf-8' });
     console.log('Content of File:' + pathToFile);
     console.log(file);
    } catch (error) {
     console.log(messages.operationFailedMessage);
    }
};
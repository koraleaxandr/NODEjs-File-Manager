import * as fs from 'fs/promises';
import path from 'path';

import { messages } from '../messages.js';

export const renameFile = async (pathString, newFilename) => {
    try {
        await fs.realpath(`${path.dirname(pathString)}/${newFilename}`);
        console.log(messages.operationFailedMessage);        
        return;
    } catch (error) {}
    try {
        await fs.rename(pathString, `${path.dirname(pathString)}/${newFilename}`);
    } catch (error) {
        console.log(messages.operationFailedMessage);
    }
};

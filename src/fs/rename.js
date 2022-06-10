import * as fs from 'fs/promises';
import path from 'path';

import { messages } from '../messages.js';

export const rename = async (pathString, newFilename) => {
    try {
        await fs.realpath(pathString)
        console.log(messages.operationFailedMessage);
        return;
    } catch (error) {}
    try {
        await fs.rename(pathString, `${path.dirname(pathString)}/${newFilename}`);
    } catch (error) {
        console.log(messages.operationFailedMessage);
    }
};

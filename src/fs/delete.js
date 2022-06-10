import * as fs from 'fs/promises';

import { messages } from '../messages.js';

export const remove = async (pathString) => {
    try {
        await fs.rm(pathString)
    } catch (error) {
        console.log(messages.operationFailedMessage);
    }
};

import * as fs from 'fs/promises';

import { messages } from '../messages.js';

export const createFile = async (pathString) => {
    try {
        await fs.writeFile(pathString,
            '', {
                flag: 'ax'
            });
    } catch (error) {
        console.log(messages.operationFailedMessage);
    };
};

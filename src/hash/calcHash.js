const {
  createHash
} = await import('crypto');
import * as fs from 'fs/promises';
import * as path from 'path';

import {
  messages
} from '../messages.js';
import {
  pathToWorkingDirectory
} from '../createDirPath.js';


export const calculateHash = async (pathString) => {
  const hash = createHash('sha256');
  try {
    const file = await fs.open(pathString);
    const input = file.createReadStream();
    input.on('readable', () => {
      const data = input.read();
      if (data)
        hash.update(data);
      else {
        console.log(`${hash.digest('hex')}`);
        console.log(messages.currentPathMessage(pathToWorkingDirectory));
      }
    });
  } catch (error) {
    console.error(messages.operationFailedMessage + error);
    console.log(messages.currentPathMessage(pathToWorkingDirectory));
  }
};

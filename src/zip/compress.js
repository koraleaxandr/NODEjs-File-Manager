import fs from 'fs';
import path from 'path';

import zlib from 'zlib';
import { pipeline } from 'stream';

import { messages } from '../messages.js';
import { pathToWorkingDirectory } from '../createDirPath.js';


export const compressFile = async (pathToFile, targetFolder) => {
    const fileName = path.basename(pathToFile, path.extname(pathToFile));
    const outputFilePath = path.join(targetFolder, fileName +'.br');

    const input = fs.createReadStream(pathToFile, 'utf-8');
const output = fs.createWriteStream(outputFilePath);
const bzip = zlib.createBrotliCompress();

pipeline(
    input,
    bzip,
    output,
    err => {
        if (err) {
            console.error(messages.operationFailedMessage + err);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
        }else {
            console.error(`File ${fileName} compressed to ${outputFilePath}`);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
          }
    }
);
};

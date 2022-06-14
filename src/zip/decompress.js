import  fs from 'fs';
import  path from 'path';

import  zlib from 'zlib';
import { pipeline } from 'stream';

import { messages } from '../messages.js';
import { pathToWorkingDirectory } from '../createDirPath.js';


export const decompressFile = async (pathToFile, targetFolder) => {
    const fileName = path.basename(pathToFile, path.extname(pathToFile));
    const outputFilePath = path.join(targetFolder, fileName + '.txt');
    console.log(outputFilePath);
    const inputFilePath = pathToFile;
    const input = fs.createReadStream(inputFilePath);
const output = fs.createWriteStream(outputFilePath, {decompress:'utf-8'});
const unzip = zlib.createBrotliDecompress();
pipeline(
    input,
    unzip,
    output,
    err => {
        if (err) {
            console.error(messages.operationFailedMessage);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
        }else {
            console.error(`File ${fileName} decompressed to ${targetFolder}`);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
          }
    }
); 
};

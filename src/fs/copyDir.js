import * as fs from 'fs/promises';
import * as path from 'path';
import {
    fileURLToPath
} from 'url';

const copyDir = async (originFolder, targetFolder) => { 
    try {
        await fs.mkdir(targetFolder, { recursive: false })
    } catch (error) {
        console.log('FS operation failed');
        return;
    }  
        
   
    try {
        const files =  await fs.readdir(originFolder, {withFileTypes : true});
        for (const file of files) {
            if (file.isFile()) {
                try {
                    await fs.copyFile(path.join(originFolder, file.name), path.join(targetFolder, file.name))
                } catch (error) {
                    console.log('FS operation failed');
                }                
            } else if (file.isDirectory) {                 
                await copyDir(path.join(originFolder, file.name), path.join(targetFolder, file.name))
            }
        }
      } catch (err) {
        console.log('FS operation failed');
      }
    }


export const copy = async () => {
    
    const __filename = fileURLToPath(
        import.meta.url);
    const __dirname = path.dirname(__filename);
    const originFolderPath = path.join(__dirname, 'files');
    const targetFolderPath = path.join(__dirname, 'files_copy');
    copyDir(originFolderPath, targetFolderPath);
};

copy();

import os from 'os';

import { messages } from '../messages.js';
import { pathToWorkingDirectory } from '../createDirPath.js';


export const parseEnv = (argument) => {
    let key;
    switch (argument) {
        case 'homedir':
            key = os.homedir();
            break;
            case 'username':
            key = os.userInfo().username;
            break;
            case 'architecture':
            key = os.arch();
            break;
            case 'architecture':
            key = os.cpus();
            break;
            case 'EOL':
            key = os.EOL;
            console.log(key);
            break;    
        default:
            console.error(messages.invalidInputMessage);
            console.log(messages.currentPathMessage(pathToWorkingDirectory));
            break;
    }   
};

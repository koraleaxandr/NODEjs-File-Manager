import os from 'os';

import { messages } from '../messages.js';
import { pathToWorkingDirectory } from '../createDirPath.js';


export const parseEnv = (argument) => {
    let key;
    switch (argument) {
        case 'homedir':
            key = os.homedir();
            console.log(key);
            break;
            case 'username':
            key = os.userInfo().username;
            console.log(key);
            break;
            case 'architecture':
            key = os.arch();
            console.log(key);
            break;
            case 'cpus':
            key = os.cpus();
            console.log(key);
            break;
            case 'EOL':
            key = os.EOL;
            console.log(key);
            break;    
        default:
            console.error(messages.invalidInputMessage);            
            break;
    }   
    console.log(messages.currentPathMessage(pathToWorkingDirectory));
};

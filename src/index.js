import process from 'process';

import {
    messages
} from './messages.js';
import { pathToWorkingDirectory } from './createDirPath.js';
import { commandsListener } from './commandsListener.js';

export let userName = 'User';

export const startApp = async () => {
    const args = process.argv.slice(2); 
    userName = args[0].split('=')[1];   
    console.log(messages.userGreetingMessage(userName));
    commandsListener();    
};

startApp();
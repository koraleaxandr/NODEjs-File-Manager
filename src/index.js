import process from 'process';

import { messages } from './messages.js';
import { commandsListener } from './commandsListener.js';

export let userName = 'User';

export const startApp = async () => {
    const args = process.argv.slice(2); 
    userName = args[0]?.split('=')[1] ? args[0].split('=')[1]: 'Anonymous';   
    console.log(messages.userGreetingMessage(userName));
    commandsListener();
    process.on('SIGINT', () => {
        console.log(messages.closeAppMessage(userName));
        process.exit(1);
    });  
};

startApp();
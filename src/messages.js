import process from 'process';
import util from 'util';

import { consoleColours } from './colors.js';
import { userName } from './index.js';

export const messages = {    
    userGreetingMessage  : (userName) => `${consoleColours.fg.green}Welcome to the File Manager ${consoleColours.fg.yellow}${userName}!`,
    closeAppMessage  : (userName) => `${consoleColours.fg.green}Thank you for using File Manager,${consoleColours.fg.yellow} ${userName}!${consoleColours.reset}`,
    currentPathMessage  : (pathToWorkingDirectory) =>`${consoleColours.reset}You are currently in ${consoleColours.fg.green} ${pathToWorkingDirectory} ${consoleColours.reset}  \n Waiting for YOUR Command ,${consoleColours.fg.yellow} ${userName}${consoleColours.reset}`,
    invalidInputMessage  : `${consoleColours.fg.red}Invalid input${consoleColours.reset}`,
    operationFailedMessage  : `${consoleColours.fg.red}Operation failed${consoleColours.reset}`
};


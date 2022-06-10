import process from 'process';

import { userName } from './index.js';


export const messages = {    
    userGreetingMessage  : (userName) =>`Welcome to the File Manager ${userName}!`,
    closeAppMessage  : (userName) =>`Thank you for using File Manager, ${userName}!`,
    currentPathMessage  : (pathToWorkingDirectory) =>`You are currently in ${pathToWorkingDirectory} \n Waiting for YOUR Command , ${userName}`,
    invalidInputMessage  : 'Invalid input',
    operationFailedMessage  : 'Operation failed'
};
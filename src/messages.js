import process from 'process';


export const messages = {    
    userGreetingMessage  : (userName) =>`Welcome to the File Manager ${userName}!`,
    closeAppMessage  : (userName) =>`Thank you for using File Manager, ${userName}!`,
    currentPathMessage  : (pathToWorkingDirectory) =>`You are currently in ${pathToWorkingDirectory}`,
    invalidInputMessage  : 'Invalid input',
    operationFailedMessage  : 'Operation failed'
};
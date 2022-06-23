import http, { IncomingMessage,ServerResponse } from 'node:http';
import * as path from 'path';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { ServerResponseObject } from '../models/response.model';

class Controller { 
    recievedUserId: string | null = null;
    
public getResponse(request: IncomingMessage): ServerResponseObject {
    console.log('Server request:');
    console.log(request.url, request.method);
    if (request.url) this.getIDFromURl(request.url);  
    
    const resp = {
        statusCode: 200,
        statusMessage: JSON.stringify([
             request.url, request.method
             ]),
    }
    return resp;
}

private getIDFromURl (url: string): string | null  {
    let recievedUserId: string | null = null;    
    const pathDir: string = path.parse(url).dir;
    if (pathDir === '/users') {
        recievedUserId = path.parse(url).name;
        console.log(recievedUserId);
        recievedUserId = uuidValidate(recievedUserId) ?  recievedUserId : null;
    }
    return this.recievedUserId = recievedUserId;
}

}

export default Controller;
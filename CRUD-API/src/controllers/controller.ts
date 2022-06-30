import http, {
    IncomingMessage,
    ServerResponse
} from 'node:http';
import * as path from 'path';
import {
    v4 as uuidv4,
    validate as uuidValidate
} from 'uuid';
import {
    ServerResponseObject
} from '../models/response.model';
import {
    messages
} from '../serverMessages/serverMessages';
import users from '../store/users'

class Controller {
    private recievedUserId: string | null = null;

    private resp: ServerResponseObject = {
        statusCode: 500,
        statusMessage: JSON.stringify('server error. try to reconnect, or refresh brouser'),
    }

    public getResponse(request: IncomingMessage): ServerResponseObject {
        console.log('Server request:');
        console.log(request.url, request.method);
        if (request.url) {
            const pathDir: string = path.parse(request.url).dir;
            if (pathDir === '/users') {
                if (path.parse(request.url).name && !this.getIDFromURl(request.url)) {
                    this.resp = {
                        statusCode: 400,
                        statusMessage: JSON.stringify(messages.notValidIdMessage),
                    };
                    return this.resp;
                } else {
                    this getRequestMethod(request);
                }                
            } else {
                this.resp = {
                    statusCode: 404,
                    statusMessage: JSON.stringify(messages.pageNotFoundmessage),
                };
            }            
        }
        return this.resp;
    }

    private getIDFromURl(url: string): string | null {
        let recievedUserId: string | null = null;
        recievedUserId = path.parse(url).name;
        console.log(recievedUserId);
        recievedUserId = uuidValidate(recievedUserId) ? recievedUserId : null;
        this.recievedUserId = recievedUserId;
        return this.recievedUserId;
    }

    private getRequestMethod(request: IncomingMessage) {
        const requestMethod: string = request.method;
        switch (requestMethod) {
            case 'GET':
                if (!this.recievedUserId) {
                    this.resp = {
                        statusCode: 200,
                        statusMessage: JSON.stringify(messages.requestWriteMessage),
                        users: users.getUsers(),
                    };
                } else if (users.getUser(this.recievedUserI)){
                    this.resp = {
                        statusCode: 200,
                        statusMessage: JSON.stringify(messages.requestWriteMessage),
                        currentUser: users.getUser(this.recievedUserI),
                    };
                } else {
                    this.resp = {
                        statusCode: 404,
                        statusMessage: JSON.stringify(messages.userNotFoundMessage),
                    };
                }
                break;

            default:
                break;
        }
    }

}

export default Controller;
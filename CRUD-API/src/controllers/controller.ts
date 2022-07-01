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
    User, CreatingUser
} from '../models/user.model';
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
                const recievedUserId: string | undefined = path.parse(url).name;
                if (recievedUserId && !this.validateIdFromUrl(recievedUserId)) {
                    this.resp = {
                        statusCode: 400,
                        statusMessage: JSON.stringify(messages.notValidIdMessage),
                    };
                    return this.resp;
                } else {
                    this.getRequestMethod(request);
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

    private validateIdFromUrl(recievedUserId: string |undefined): string | null {
        this.recievedUserId = uuidValidate(recievedUserId) ? recievedUserId : null;
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
            case 'POST':
                if (this.validateRecievedUser(request)) {
                const creatingUser: CreatingUser = JSON.parse(request.body);
                //users.addUser(creatingUser);
            default:
                break;
        }
    }

    private validateRecievedUser (request: IncomingMessage):boolean {
        const recievedUser= JSON.parse(request.body) as CreatingUser;
        if (typeOf(recievedUser.username) === 'string' && typeOf(recievedUser.age) === 'number' && recievedUser.hobbies instanceOf Array) {
            return true;
        } else return false;
    }

}

export default Controller;

import * as path from 'path';
import {
  v4 as uuidv4,
  validate as uuidValidate,
} from 'uuid';
import {
  ServerResponseObject,
} from '../models/response.model';
import {
  User, CreatingUser,
} from '../models/user.model';
import messages from '../serverMessages/serverMessages';
import users from '../store/users';

class Controller {
  private recievedUserId: string | null = null;

  private resp: ServerResponseObject = {
    statusCode: 500,
    statusMessage: JSON.stringify('server error. try to reconnect, or refresh brouser'),
  };

  public getResponse(request: Request): ServerResponseObject {
    console.log('Server request:');
    console.log(request.url, request.method);
    if (request.url) {
      const pathDir: string = path.parse(request.url).dir;
      if (pathDir === '/users') {
        const recievedUserId: string | undefined = path.parse(request.url).name;
        if (recievedUserId && !this.validateIdFromUrl(recievedUserId as string)) {
          this.resp = {
            statusCode: 400,
            statusMessage: JSON.stringify(messages.notValidIdMessage),
          };
          return this.resp;
        }
        this.getRequestMethod(request);
      } else {
        this.resp = {
          statusCode: 404,
          statusMessage: JSON.stringify(messages.pageNotFoundMessage),
        };
      }
    }
    return this.resp;
  }

  private validateIdFromUrl(recievedUserId: string): string | null {
    this.recievedUserId = uuidValidate(recievedUserId) ? recievedUserId : null as string | null;
    return this.recievedUserId;
  }

  private getRequestMethod(request: Request) {
    const requestMethod: string = request.method as string;
    switch (requestMethod) {
      case 'GET':
        if (!this.recievedUserId) {
          this.resp = {
            statusCode: 200,
            statusMessage: JSON.stringify(messages.requestWriteMessage),
            users: users.getUsers(),
          };
        } else if (users.getUser(this.recievedUserId)) {
          this.resp = {
            statusCode: 200,
            statusMessage: JSON.stringify(messages.requestWriteMessage),
            currentUser: users.getUser(this.recievedUserId),
          };
        } else {
          this.resp = {
            statusCode: 404,
            statusMessage: JSON.stringify(messages.userNotFoundMessage),
          };
        }
        break;
      case 'POST':
        if (Controller.validateRecievedUser(request)) {
          const creatingUser: CreatingUser = JSON.parse(JSON.stringify(request.body));
          const userId: string = uuidv4();
          const creatingUserWithId = { id: userId, ...creatingUser } as User;
          console.log(creatingUserWithId);
          users.addUser(creatingUserWithId);
        }
        break;
      default:
        break;
    }
  }

  private static validateRecievedUser(request: Request):boolean {
    const recievedUser = JSON.parse(JSON.stringify(request.body)) as CreatingUser;
    console.log(recievedUser);
    if (typeof (recievedUser.username) === 'string' && typeof (recievedUser.age) === 'number' && recievedUser.hobbies instanceof Array) {
      return true;
    } return false;
  }
}

export default Controller;

import { User } from './user.model';

export interface ServerResponseObject = {
    statusCode: number;
    statusMessage: string;
    users?: User[];
    currentUser?: User;
}
import { User } from '../models/user.model';


class UsersDb {

    storedUsers: User[] = [];

    public getUsers (): User[] {
        return this.storedUsers;
    }

    public getUser(id: string): User | undefined {
        return this.storedUsers.find((user) => {
            return (id === user.id)
        });
    }

    public addUser (user): User | null {
        if (!this.getUser(user.id)) {
        this.storedUsers.push(user);
        return user;
        } else return null;
    }

    public deleteUser (id: string): boolean {
        if (this.getUser(id)) {
            this.storedUsers = this.storedUsers.filter((user) => {
            return (id !== user.id)
            });
            return true;
        } else return false
    }

    public updateUser (updatedUser: User): User | null {
        const index: number = this.storedUsers.find((user) => {
            return (updatedUser.id === user.id)
        });
        if (index !== -1) {
            this.storedUsers[index] = (...updatedUser);
            return this.storedUsers[index];
        } else return null
    }

}

const users = new UserDb;
export default users;
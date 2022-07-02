import {
  User,
} from '../models/user.model.ts';

class UsersDb {
  storedUsers: User[] = [];

  public getUsers(): User[] {
    return this.storedUsers;
  }

  public getUser(id: string): User | undefined {
    return this.storedUsers.find((user) => (id === user.id));
  }

  public addUser(user): User | null {
    if (!this.getUser(user.id)) {
      this.storedUsers.push(user);
      return user;
    } return null;
  }

  public deleteUser(id: string): boolean {
    if (this.getUser(id)) {
      this.storedUsers = this.storedUsers.filter((user) => (id !== user.id));
      return true;
    } return false;
  }

  public updateUser(updatedUser: User): User | null {
    const index: number = this.storedUsers.find((user) => (updatedUser.id === user.id));
    if (index !== -1) {
      this.storedUsers[index] = {
        ...this.storedUsers[index],
        ...updatedUser,
      };
      return this.storedUsers[index];
    } return null;
  }
}

const users = new UsersDb();
export default users;

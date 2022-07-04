export interface CreatingUser {
    username : string;
    age: number;
    hobbies: string[];
}

export interface User extends CreatingUser {
    id: string;
}

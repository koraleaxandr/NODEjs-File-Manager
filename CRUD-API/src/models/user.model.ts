export interface User extends CreatingUser {
    id: string;    
}

export interface CreatingUser {
    username : string;
    age: number;
    hobbies: string[];
}
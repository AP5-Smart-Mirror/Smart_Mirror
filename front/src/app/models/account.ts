import { Profile } from './profile';

export class Account {
    id: number;
    username: string;
    password: string;
    profiles: Array<Profile>;

    constructor(id: number, username: string, password: string, profiles: Array<Profile>){
        this.id = id;
        this.username = username;
        this.password = password;
        this.profiles = profiles;
    }
}

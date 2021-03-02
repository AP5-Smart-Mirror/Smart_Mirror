import { Profile } from './profile';

export class Account {
    id: number;
    username: string;
    password: string;
    profiles: Array<Profile>;
}

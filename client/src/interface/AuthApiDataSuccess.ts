import { User } from './User';

export interface AuthApiDataSuccess {
    message: string;
    user: User;
    token: string;
}
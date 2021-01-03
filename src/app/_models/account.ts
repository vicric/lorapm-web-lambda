// OLD MODEL WITH DOTNET CORE LOCAL BACKEND
import { Role } from './role';

export class Account {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    jwtToken?: string;
}




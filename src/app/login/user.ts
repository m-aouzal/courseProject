export class User {

    id?: number;
    username?: string;
    email: string;
    password: string;
    status?: string;

    constructor(email: string, password: string,status? : string, id?: number, username?: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.status = status;
    }
}

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

export interface Err {
    error: string;
    message: string;
    path: string;
    status: Number;
}

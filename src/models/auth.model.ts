/* export interface DbUser {
    id: number;
    username: string;
    password: string;
    imie: string;
    nazwisko: string;
    email: string | null;
    locked: number;
    data_od: Date;
    data_do: Date | null;
    data_hasla: Date;
    roles: string[];
} */

export interface NetUser {
    id: number;
    username: string;
    password: string;
    imie: string;
    nazwisko: string;
    email: string | null;
    locked: number;
    data_od: string;
    data_do: string | null;
    data_hasla: string;
    roles: string[];
}

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

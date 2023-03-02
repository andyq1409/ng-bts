export interface NetRole {

  id: string;
  id_user: string;
  id_role: string;
  code_role: string;
  descr: string;
  date_from: string;
  date_to: string | null ;
}

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

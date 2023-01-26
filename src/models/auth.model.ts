export interface DbUser {
    id: number;
    username: string;
    password?: string;
    imie: string;
    nazwisko: string;
    email?: string;
    locked: number;
    data_od: string;
    data_do?: string | null;
    data_hasla: string;
    roles?: string[];
}


/*  private Long id;
    private String username;
    private String password;
    private String nazwisko;
    private String imie;
    private String email;
    private Date data_od;
    private Date data_do;
    private Date data_hasla;
    private Set<String> roles = new HashSet<>();
*/



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



  export function formatDate(dt: Date): string {
    var year = dt.toLocaleString("default", { year: "numeric" });
    var month = dt.toLocaleString("default", { month: "2-digit" });
    var day = dt.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }

/*   export function net2dbUser(dt: NetUser): DbUser {
    return {
    id: dt.id,
    username: dt.username,
    password: dt.password,
    imie: dt.imie,
    nazwisko: dt.nazwisko,
    email: dt.email,
    locked: dt.locked,
    data_od: new Date(dt.data_od),
    data_do: (dt.data_do === null) ? null : new Date(dt.data_do),
    data_hasla: new Date(dt.data_hasla),
    roles: dt.roles
    }
  } */
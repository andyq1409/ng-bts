
  export function formatDate(dt: Date): string {
    var year = dt.toLocaleString("default", { year: "numeric" });
    var month = dt.toLocaleString("default", { month: "2-digit" });
    var day = dt.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  }
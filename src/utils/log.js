import { horaAtual } from "./datetime.js";

export function logError(err) {
    console.log(horaAtual() + ' ERROR --> ' + err.message);
}


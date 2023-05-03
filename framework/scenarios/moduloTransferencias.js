import { script1 } from "../scripts/Transferencias/script1.js";
import { script2 } from "../scripts/Transferencias/script2.js";

function scenario1() {
  script1();
}
function scenario2() {
  script2();
}

module.exports = { scenario1, scenario2 }
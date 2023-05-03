import { Httpx } from "https://jslib.k6.io/httpx/0.0.3/index.js";
import configLoad from "./config/load.js";
export * from "./scenarios/moduloTransferencias.js";


const BASE_URL = __ENV.BASE_URL || "https://www.bg.com.bo";
const PAUSE_MIN = __ENV.PAUSE_MIN || 1;
const PAUSE_MAX = __ENV.PAUSE_MAX || 5;

const session = new Httpx({
  baseURL: BASE_URL,
  headers: {
    "User-Agent": "k (https://test.io)",
  },
  timeout: 60000, // 60 sec (k6 default)
});

globalThis.session = session;
globalThis.PAUSE_MIN =PAUSE_MIN;
globalThis.PAUSE_MAX=PAUSE_MAX;


const listScenarios = JSON.parse(open("./config/scenarios.json"));

const scenarioName = __ENV.SCENARIO_NAME;
const testType = __ENV.TEST_TYPE;
const config = configLoad[testType];

const dataOptions = {
  scenarios: Object.entries(listScenarios.scenarios).reduce((acc, [key, value]) => {
    acc[key] = Object.assign({}, config, value);
    return acc;
  }, {}),
};



export const options = Object.assign(
    {
      insecureSkipTlsVerify: false, // set to true to ignore certificate errors (e.g. self-signed test certs)
    },
    scenarioName.toUpperCase() === "ALL" ? dataOptions : {
        scenarios: {
          [scenarioName]: dataOptions.scenarios[scenarioName],
        },
      }
  );

export function setup() {
    console.log("Entro al Setup");
}

export default function () {
  console.log("No scenarios in test.json. Executing default function...");
}


//k6 run --env SCENARIO_NAME=scenario1 --env TEST_TYPE=stress --env STRESS_DURATION=5s --env TARGET_VUS=10 --rps 10 main.js
//node nodejs/functions/resultMail.js    para llamar al mail
//docker-compose run --rm nodejs node /framework/nodejs/functions/resultMail.js 
//docker-compose run --rm nodejs node /app/nodejs/functions/resultMail.js 

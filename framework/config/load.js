const targetVUs = parseInt(__ENV.TARGET_VUS, 10) || 100;
const timeStress = __ENV.STRESS_DURATION || 100;
export default {
  "stress": {
    "executor": "constant-vus",
    "vus": targetVUs,
    "duration": timeStress
  },
  "spike": {
    "executor": "ramping-vus",
    "startVUs": 0,
    "stages": [
      { "duration": "30s", "target": targetVUs },
      { "duration": "30s", "target": 0 }
    ]
  },
  "load": {
    "executor": "ramping-vus",
    "startVUs": 0,
    "stages": [
      { "duration": "1m", "target": Math.floor(targetVUs / 4) },
      { "duration": "1m", "target": targetVUs  },
      { "duration": "1m", "target": 0 }
    ]
  }
};
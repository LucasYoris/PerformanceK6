import { verifyResponse } from '../../utils/response.js';
import { taggedRequest } from '../../utils/request.js';

export function script1() {

  const res = taggedRequest('GET','/_next/data/Nl8GoNdA4HPaM2uWu68RV/es/personas.json');
  verifyResponse({
    response: res,
    expectedStatus: 200,
    expectedContent: 'image',
    failOnError: false,
    printOnError: false,
  });

}
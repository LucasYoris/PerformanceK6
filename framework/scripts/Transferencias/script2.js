import { verifyResponse } from '../../utils/response.js';
import { taggedRequest } from '../../utils/request.js';

export function script2() {

  const res = taggedRequest('GET', '/_next/data/Nl8GoNdA4HPaM2uWu68RV/es/sucursales.json');
  verifyResponse({
    response: res,
    expectedStatus: 200,
    expectedContent: 'id',
    failOnError: true,
    printOnError: true,
  });

}

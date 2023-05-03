
export function taggedRequest(method, url, params) {
    const options = params || {};
    switch (method) {
      case 'GET':
        return globalThis.session.get(url,options);
      case 'POST':
        return globalThis.session.post(url, options);
      case 'PUT':
        return globalThis.session.put(url, options);
      default:
        throw new Error(`Invalid HTTP method: ${method}`);
    }
  }
  
import { baseUrl } from "./constants";

export const request = async (
  uri: string,
  method: string,
  body?: FormData,
  headers?: Headers | {},
  external?: boolean
) => {

  try {

    method = method ?? 'GET'
    external = external ?? false
    // Request with GET/HEAD method cannot have body.
    body = method === 'GET' || method === 'HEAD' ? undefined : body

    const response = await fetch(
      external === false ?
        baseUrl + uri
        : uri,
      {
        mode: external === false ? 'cors' : 'no-cors',
        method: method,
        headers: headers,
        body
      }
    );

    return response.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
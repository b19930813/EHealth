//axios config

const config = {

    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    baseURL: 'https://localhost:44331',
    // timeout: 3000,
    withCredentials: true,
    responseType: 'json',
    responseEncoding: 'utf8',

}

export { config };
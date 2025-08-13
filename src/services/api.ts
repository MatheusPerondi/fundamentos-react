import axios from "axios";

export function setupApiCliente(){
    const api = axios.create({
        baseURL: 'http://localhost:3333',
    })

    return api;
}

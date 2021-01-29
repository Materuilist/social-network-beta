import { push } from "connected-react-router";

import { tokenId } from '../constants';

export class BaseService {
    constructor() {
        this.baseUrl = "http://localhost:8000/";
    }

    async request(url = "", body, headers, needsAuth = true, resType = "json") {
        const authToken = localStorage.getItem(tokenId);
        if (needsAuth && !authToken) {
            push("/auth");
            return null;
        }

        headers = needsAuth
            ? { Authorization: `Bearer ${authToken}`, ...headers }
            : headers;

        const res = await fetch(`${this.baseUrl}${url}`, { body, headers });
        const parsedRes = await res[resType]();
        return parsedRes;
    }
}

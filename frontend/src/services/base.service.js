import { push } from "connected-react-router";

import { store } from "../store";
import { tokenId } from "../constants";
import { notificationsActions } from "../store/actions";

export class BaseService {
    constructor() {
        this.baseUrl = "http://localhost:8000/";
    }

    async request(url = "", init, needsAuth = true, resType = "json") {
        const authToken = localStorage.getItem(tokenId);
        if (needsAuth && !authToken) {
            push("/auth");
            return null;
        }

        if(!init){
            init = {}
        }

        init.headers = needsAuth
            ? { Authorization: `Bearer ${authToken}`, ...init.headers }
            : init.headers;

        let res, parsedRes = null;
        try {
            res = await fetch(`${this.baseUrl}${url}`, init);
            parsedRes = await res[resType]();
        } catch {
        } finally {
            if (!res || !res.ok) {
                const errorMessage =
                    parsedRes && parsedRes.message
                        ? parsedRes.message
                        : "Произошла ошибка! Приносим извинения...";
                store.dispatch(
                    notificationsActions.notifyError(errorMessage, errorMessage)
                );
                return null;
            }
            return parsedRes;
        }
    }
}

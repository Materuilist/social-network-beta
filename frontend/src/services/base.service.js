import { store } from "../store";
import { tokenId } from "../constants";
import { notificationsActions } from "../store/actions";
import Config from "Config";

export class BaseService {
    constructor() {
        this.baseUrl = Config.serverUrl;
    }

    async request(url = "", init, needsAuth = true, resType = "json", isStatic = false) {
        const authToken = localStorage.getItem(tokenId);
        if (needsAuth && (!authToken || authToken === "undefined")) {
            // store.dispatch(push("/auth"));
            localStorage.removeItem(tokenId);
            return null;
        }

        if (!init) {
            init = {};
        }

        init.headers = needsAuth
            ? { Authorization: `Bearer ${authToken}`, ...init.headers }
            : init.headers;

        let res,
            parsedRes = null;
        try {
            res = await fetch(`${this.baseUrl}${isStatic?'':'api/'}${url}`, init);
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

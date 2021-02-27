import { store } from "../store";

import Config from "Config";
import { tokenId } from "../constants";
import {
    authActions,
    chatActions,
    notificationsActions,
} from "../store/actions";

const wsStates = {
    EMPTY: "EMPTY",
    OPEN: "OPEN",
    AUTHORIZED: "AUTHORIZED",
    CLOSED: "CLOSED",
    NEEDS_SIGN_OUT: "NEEDS_SIGN_OUT",
};

class WsService {
    constructor() {
        this._baseUrl = Config.wsUrl;
        this._ws = null;
        this._state = wsStates.EMPTY;
    }

    _addWsHandlers() {
        this._ws.onopen = (event) => {
            console.log(event);
            this._state = wsStates.OPEN;
            this.send("enter");
        };

        this._ws.onclose = (event) => {
            console.log(event);
            this._state = wsStates.CLOSED;
            this._ws = null;
            switch (event.code) {
                case 4001: {
                    this._state = wsStates.NEEDS_SIGN_OUT;
                    store.dispatch(authActions.signOut());
                    store.dispatch(
                        notificationsActions.notifyError(
                            "Ваша сессия истекла",
                            "Ваша сессия истекла! Авторизуйтесь повторно."
                        )
                    );
                    return;
                }
            }
        };

        this._ws.onerror = (event) => {
            this._state = wsStates.CLOSED;
            console.log(event);
        };

        this._ws.onmessage = (wsEvent) => {
            const { event, payload } = JSON.parse(wsEvent.data);

            switch (event) {
                case "enter": {
                    this._state = wsStates.AUTHORIZED;
                    return;
                }
                case "incoming message": {
                    const { chat, message } = payload;
                    store.dispatch(chatActions.onReceiveMessage(chat, message));
                    return;
                }
                case "message delivered": {
                    const { chat, message } = payload;
                    store.dispatch(chatActions.onMessageDelivered(chat, message));
                    return;
                }
            }
        };
    }

    connect() {
        this._ws = new WebSocket(this._baseUrl);
        this._addWsHandlers();
        const enterPromise = new Promise((resolve, reject) => {
            const checkEnterStateInterval = setInterval(() => {
                switch (this._state) {
                    case wsStates.AUTHORIZED: {
                        clearInterval(checkEnterStateInterval);
                        return resolve();
                    }
                    case (wsStates.CLOSED, wsStates.NEEDS_SIGN_OUT): {
                        clearInterval(checkEnterStateInterval);
                        return reject();
                    }
                }
            }, 1000);
        });
        return enterPromise;
    }

    disconnect() {
        this._ws && this._ws.close();
    }

    send(event, payload = null) {
        this._ws.send(
            JSON.stringify({
                event,
                payload,
                token: localStorage.getItem(tokenId),
            })
        );
    }

    sendMessage(receiverId, text) {
        this.send("dialogue-message", { receiverId, text });
    }
}

export const wsService = new WsService();

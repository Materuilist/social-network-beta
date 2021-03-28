import { store } from "../store";

import Config from "Config";
import { tokenId } from "../constants";
import {
    authActions,
    chatActions,
    notificationsActions,
    onlineDataActions,
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
        this._baseUrl = `${
            location.hostname === "localhost"
                ? ""
                : location.origin.replace("http", "ws")
        }${Config.wsUrl}`;
        this._ws = null;
        this._state = wsStates.EMPTY;
        // словарь тип события : массив обработчиков
        this._customHandlers = {}; // при потере соединения реконнект должен восстанавливать обработчики событий
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
                    break;
                }
                case "toggle-status": {
                    const { userId, isOnline } = payload;

                    store.dispatch(
                        onlineDataActions.toggleUserOnlineStatus(
                            userId,
                            isOnline
                        )
                    );
                    break;
                }
                case "incoming message": {
                    const { chat, message, senderDetails } = payload;
                    store.dispatch(
                        chatActions.onReceiveMessage(
                            chat,
                            message,
                            senderDetails
                        )
                    );
                    break;
                }
                case "message delivered": {
                    const { chat, message } = payload;
                    store.dispatch(
                        chatActions.onMessageDelivered(chat, message)
                    );
                    break;
                }
            }

            this._customHandlers[event]?.forEach((handler) => handler(payload));
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

    addCustomEventListener(type, customHandler) {
        this._customHandlers[type] = [
            ...(this._customHandlers[type] ?? []),
            customHandler,
        ];
    }

    removeCustomHandler(type, customHandlerRef) {
        this._customHandlers[type] = this._customHandlers[type]?.filter(
            (customHandler) => customHandler !== customHandlerRef
        );
    }
}

export const wsService = new WsService();

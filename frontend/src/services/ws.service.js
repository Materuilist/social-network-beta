import Config from "Config";

class WsService {
    constructor() {
        this.baseUrl = Config.wsUrl;
        this.ws = new WebSocket(this.baseUrl);

        this.ws.onopen = (event) => {
            console.log(event);
        };

        this.ws.onclose = (event) => {
            console.log(event);
        };

        this.ws.onerror = (event) => {
            console.log(event);
        };
    }

    sendMessage(message) {
        this.ws.send(JSON.stringify({ event: "chat", payload: { message } }));
    }
}

export const wsService = new WsService();

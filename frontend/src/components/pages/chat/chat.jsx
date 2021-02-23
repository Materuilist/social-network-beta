import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { wsService } from "../../../services/ws.service";

export const Chat = () => {
    const [receiverId, setReceiverId] = useState("");
    const [text, setText] = useState("");
    useEffect(() => {}, []);

    return (
        <div style={{ backgroundColor: "green" }}>
            <Input
                value={receiverId}
                onChange={({ target: { value } }) => setReceiverId(value)}
            />
            <Input
                value={text}
                onChange={({ target: { value } }) => setText(value)}
            />
            <button onClick={() => wsService.sendMessage(receiverId, text)}>
                send
            </button>
        </div>
    );
};

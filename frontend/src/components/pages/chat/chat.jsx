import React, { useEffect } from "react";
import { Input } from "reactstrap";
import { wsService } from "../../../services/ws.service";

export const Chat = () => {
    useEffect(() => {}, []);

    return (
        <div style={{ backgroundColor: "green" }}>
            <Input
                onChange={({ target: { value } }) =>
                    wsService.sendMessage(value)
                }
            />
        </div>
    );
};

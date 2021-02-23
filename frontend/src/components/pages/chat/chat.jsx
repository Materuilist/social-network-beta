import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const mapStateToProps = ({ chat }) => ({ chat });

export const Chat = connect(mapStateToProps)(({ chat }) => {
    const query = new URLSearchParams(useLocation().search);
    const userId = query.get("userId");
    const chatId = query.get("chatId");

    return <div style={{ color: "black" }}>Chat</div>;
});

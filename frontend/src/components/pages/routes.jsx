import React from 'react';

import Chat from "./chat/chat";
import Friends from "./friends/friends";
import Profile from "./profile/profile";

export const routes = [
    { name:'Профиль', path: "/profile", component: <Profile /> },
    { name:'Друзья', path: "/friends", component: <Friends /> },
    { name:'Чат', path: "/chat", component: <Chat /> },
];

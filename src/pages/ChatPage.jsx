import Header from "src/layouts/common/header/Header.jsx";
import {Outlet} from "react-router";
import React from "react";

const ChatPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header/>
            <Outlet />
        </div>
    );
};

export default ChatPage;
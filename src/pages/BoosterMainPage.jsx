import React from "react";
import Header from "../layouts/common/header/Header.jsx"
import {Outlet} from "react-router";


const BoosterMainPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header/>
            <Outlet />
        </div>
    );
};

export default BoosterMainPage;
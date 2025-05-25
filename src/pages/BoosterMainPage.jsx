import React from "react";
import Header from "../layouts/common/Header"
import { Outlet } from "react-router";


const BoosterMainPage = () => {
    return (
        <div className="flex flex-col h-full">
            <Header forBoosterPage={true}/>
            <Outlet />
        </div>
    );
};

export default BoosterMainPage;
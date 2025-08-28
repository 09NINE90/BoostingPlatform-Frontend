import Logo from "src/assets/icons/Logo.svg";
import React from "react";
import {Telegram, YouTube} from "src/assets/icons/index.js";

const LeftFooter = () => {
    return (
        <div className="flex flex-col items-center xl:items-start mb-8 xl:mb-0">
            <img src={Logo} alt={"Logo"} className="w-32 md:w-auto"/>
            <div className="flex flex-col mt-4 items-center md:items-start">
                <div className="kanit-bold text-xl">
                    Social media:
                </div>
                <div className="flex flex-row mt-2 space-x-3">
                    <a href="#"><YouTube/></a>
                    <a href="#"><Telegram/></a>
                </div>
            </div>
        </div>
    )
}

export default LeftFooter;
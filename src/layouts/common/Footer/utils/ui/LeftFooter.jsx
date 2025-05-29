import Logo from "src/assets/icons/Logo.svg";
import React from "react";
import {Telegram, YouTube} from "src/assets/icons/index.js";

const LeftFooter = () => {
    return (
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <img src={Logo} className="w-32 md:w-auto"/>
            <div className="flex flex-col mt-4 items-center md:items-start">
                <div className="kanit-bold text-xl">
                    Social media:
                </div>
                <div className="flex flex-row mt-2 space-x-3">
                    <a href="#"><YouTube className="w-10 h-7 md:w-[48px] md:h-[34px] hover:scale-105"/></a>
                    <a href="#"><Telegram className="w-8 h-8 md:w-[35px] md:h-[35px] hover:scale-105"/></a>
                </div>
            </div>
        </div>
    )
}

export default LeftFooter;
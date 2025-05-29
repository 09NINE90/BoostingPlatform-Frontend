import React from "react";
import {Mail, Telegram, WhatsApp} from "src/assets/icons/index.js";

const RightFooter = () => {
    return (
        <div className="flex flex-col justify-start items-center md:items-end">
            <div className="flex flex-col kanit-medium text-lg md:text-xl text-center md:text-right">
                <a href="#" className="hover:text-purple-300 transition-colors">Our mission</a>
                <a href="#" className="hover:text-purple-300 transition-colors">About us</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Career</a>
                <a href="#" className="hover:text-purple-300 transition-colors">Support</a>
                <a href="#" className="hover:text-purple-300 transition-colors">FAQ</a>
            </div>
            <div className="flex flex-col mt-3 text-center md:text-right">
                <div className="kanit-bold">
                    Contact:
                </div>
                <div className="flex flex-row mt-2 space-x-3">
                    <a href="#"><Mail className="w-8 h-8 md:w-[35px] md:h-[35px] hover:scale-105"/></a>
                    <a href="#"><Telegram className="w-8 h-8 md:w-[35px] md:h-[35px] hover:scale-105"/></a>
                    <a href="#"><WhatsApp className="w-8 h-8 md:w-[35px] md:h-[35px] hover:scale-105"/></a>
                </div>
            </div>
        </div>
    )
}

export default RightFooter
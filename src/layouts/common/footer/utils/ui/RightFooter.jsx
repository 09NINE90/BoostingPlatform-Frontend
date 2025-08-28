import React from "react";
import {Mail, Telegram, WhatsApp} from "src/assets/icons/index.js";
import {NavLink} from "react-router-dom";

const RightFooter = () => {

    const CustomLink = ({link = '#', text}) => {
        return (
            <NavLink to={link} target='_blank' className="hover:text-third transition-colors">{text}</NavLink>
        )
    }

    return (
        <div className="flex flex-col justify-start items-center xl:items-end">
            <div className="flex flex-col kanit-medium text-lg xl:text-xl text-center xl:text-right">
                <CustomLink link='/become/booster' text='Become booster'/>
                <CustomLink text='Our mission'/>
                <CustomLink text='About us'/>
                <CustomLink text='Support'/>
                <CustomLink text='FAQ'/>
            </div>
            <div className="flex flex-col mt-3 text-center xl:text-right">
                <div className="kanit-bold">
                    Contact:
                </div>
                <div className="flex flex-row mt-2 space-x-3">
                    <a href="#"><Mail/></a>
                    <a href="#"><Telegram/></a>
                    <a href="#"><WhatsApp/></a>
                </div>
            </div>
        </div>
    )
}

export default RightFooter
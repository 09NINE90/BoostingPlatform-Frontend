import React from "react";
import {NavLink} from "react-router-dom";

const CenterFooter = () => {

    const CustomLink = ({link = '#', text}) => {
        return (
            <NavLink to={link} target='_blank' className="text-text-primary hover:text-third transition-colors">{text}</NavLink>
        )
    }

    return (
        <div
            className="flex flex-col w-full md:w-[50%] max-w-[670px] text-center mx-auto gap-2 kanit-light order-first md:order-none mb-8 md:mb-0">
            <p className="text-sm md:text-base">
                <span className="kanit-bold">VBoost</span> is a service that helps players achieve goals in
                modern
            </p>
            <p className="text-sm md:text-base">
                multiplayer games. We offer rank ups, challenging missions,
            </p>
            <p className="text-sm md:text-base">
                individual training, and rare resource farming.
            </p>
            <div className="flex flex-col justify-center gap-1 mt-4 kanit-thin text-sm md:text-base">
                <CustomLink text='User Agreement'/>
                <CustomLink text='Privacy Policy'/>
                <CustomLink text='Refund Policy'/>
                <CustomLink text='Terms of Use'/>
                <CustomLink text='Payments and Security'/>
            </div>
        </div>
    )
}

export default CenterFooter;
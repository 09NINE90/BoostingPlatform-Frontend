import React from "react";

const CenterFooter = () => {
    return (
        <div
            className="flex flex-col w-full md:w-[50%] max-w-[670px] text-center mx-auto gap-2 kanit-light order-first md:order-none mb-8 md:mb-0">
            <p className="text-sm md:text-base">
                <span className="font-bold">VBoost</span> is a service that helps players achieve goals in
                modern
            </p>
            <p className="text-sm md:text-base">
                multiplayer games. We offer rank ups, challenging missions,
            </p>
            <p className="text-sm md:text-base">
                individual training, and rare resource farming.
            </p>
            <div className="flex flex-col justify-center gap-1 mt-4 kanit-thin text-sm md:text-base">
                <a href="#" className="text-white hover:text-purple-300 transition-colors">User Agreement</a>
                <a href="#" className="text-white hover:text-purple-300 transition-colors">Privacy Policy</a>
                <a href="#" className="text-white hover:text-purple-300 transition-colors">Refund Policy</a>
                <a href="#" className="text-white hover:text-purple-300 transition-colors">Terms of Use</a>
                <a href="#" className="text-white hover:text-purple-300 transition-colors">Payments and Security</a>
            </div>
        </div>
    )
}

export default CenterFooter;
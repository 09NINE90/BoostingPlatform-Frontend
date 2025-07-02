import {NavLink} from "react-router";
import React from "react";

const OfferCard = ({offer}) => {
    return (
        <NavLink to={`/offer/${offer.id}`}>
            <div className="group relative w-full max-w-[300px] h-[300px] flex flex-col overflow-hidden">
                <img
                    src={offer.imageUrl}
                    alt={offer.title}
                    className="absolute top-0 left-0 w-full h-full object-fill z-0"
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0A0022] via-[#0A0022b3] to-[#0A002200] z-10"/>

                <div className="relative z-20 flex flex-col h-full justify-end p-4">
                    <h2 className="text-text-primary kanit-bold text-xl mb-2">{offer.title}</h2>

                    <p className="text-text-primary/90 kanit-light mb-4 truncate group-hover:whitespace-normal group-hover:overflow-visible group-hover:text-clip">
                        {offer.description}
                    </p>

                    <div className="flex justify-between items-end">
                        <span className="text-text-primary kanit-light text-lg">$ {offer.price}</span>
                        <button
                            className="bg-primary hover:bg-secondary text-text-primary kanit-regular px-4 py-2">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}


export default OfferCard;
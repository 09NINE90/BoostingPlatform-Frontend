import React from 'react';
import {NavLink} from 'react-router-dom';


const BoosterHeader = () => {

    const navButton = (path, title) => {
        return (
            <NavLink to={path}
                     className={({ isActive }) =>
                         `px-5 ${isActive ? 'text-primary' : 'hover:text-primary'}`
                     }
            >
                <p className="text-xl kanit-regular uppercase hover:text-primary">
                    {title}
                </p>
            </NavLink>
        )
    };

    return (
        <div className="flex items-center justify-between">
            {navButton("/booster/dashboard", "Dashboard")}
            {navButton("/booster/orders", "My Orders")}
        </div>
    );
}

export default BoosterHeader;
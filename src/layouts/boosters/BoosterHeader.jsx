import React from 'react';
import styles from '../../styles/Header.module.css'
import { Link} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AppBar, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../../assets/icons/Logo.svg';


const BoosterHeader = () => {

    const navButton = (path, title) => {
        return(
            <NavLink
                to={path}
                className={"px-5"}
            >
                <p className="">{title}</p>
            </NavLink>
        )
    };

    return (
        <AppBar position='static' color="bgColor" enableColorOnDark>
            <div className="flex flex-row items-center justify-between px-5 py-2">
                <Link color='secondary' to="/">
                    <div className={styles.Logo}>
                        <img className="w-19" src={Logo} />
                    </div>
                </Link>
                <div className="flex items-center justify-between">
                    {navButton("/booster/dashboard", "Dashboard")}
                    {navButton("/booster/orders", "My Orders")}
                </div>
                <nav className="flex justify-between flex-row" >
                    
                    <div className="px-4">
                        <IconButton > 
                            <PersonIcon/>  
                        </IconButton>
                    </div>
                </nav>
            </div>
        </AppBar>
    );
}

export default BoosterHeader;
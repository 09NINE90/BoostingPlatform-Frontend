import Logo from "src/assets/icons/Logo.svg";
import {Link} from "react-router-dom";

const LogoHome = () => {
    return (
        <Link color='secondary' to="/" className="mr-10">
            <div className={Logo}>
                <img className="w-[50px]" src={Logo}/>
            </div>
        </Link>
    )
}

export default LogoHome;
import Logo from "src/assets/icons/Logo.svg";
import {Link} from "react-router-dom";

const LogoHome = ({forBoosterPage}) => {
    return (
        <Link color='secondary' to={forBoosterPage ? '/booster/dashboard' : '/'} className="mr-10">
            <div className={Logo}>
                <img className="w-[50px]" src={Logo} alt={"Logo"}/>
            </div>
        </Link>
    )
}

export default LogoHome;
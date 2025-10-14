import Logo from "src/assets/icons/Logo.svg";
import {Link} from "react-router-dom";
import {Divider, Typography} from "@mui/material";
import theme from "../../../../../theme/theme.jsx";
import Box from "@mui/material/Box";

const LogoHome = ({forBoosterPage, isMobile}) => {
    return (
        <Link
            color='secondary'
            to={forBoosterPage ? '/booster/dashboard' : '/'}
            className="mr-2 flex items-center gap-3 hover:no-underline"
        >
            <div className={Logo}>
                <img className="w-[50px]" src={Logo} alt={"Logo"}/>
            </div>
            {!forBoosterPage && !isMobile && (
                <Box sx={{display: 'flex', alignItems: 'center', gap: 4}}>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            height: 40,
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main
                            }
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: theme.typography.fontWeightRegular,
                            color: theme.palette.text.secondary,
                            fontSize: '1.1rem',
                            letterSpacing: '0.3px',
                            transition: 'color 0.2s ease',
                            '&:hover': {
                                color: theme.palette.primary.main
                            }
                        }}>
                        Home
                    </Typography>
                </Box>
            )}
        </Link>
    )
}

export default LogoHome;
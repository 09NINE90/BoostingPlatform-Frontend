import { createTheme } from "@mui/material";

const customColors = {
    primary: '#FD980B',
    secondary: '#E28607',
    third: '#00A0FF',
    background: '#110134',
    backgroundPaper: '#19054D',
    textPrimary: '#FFFFFF',
    textSecondary: '#BDBDBD',
    divider: '#443D54',
};

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: customColors.primary,
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: customColors.secondary,
            contrastText: '#FFFFFF',
        },
        background: {
            default: customColors.background,
            paper: customColors.backgroundPaper,
        },
        third: {
            main: customColors.third,
            contrastText: '#FFFFFF',
        },
        text: {
            primary: customColors.textPrimary,
            secondary: customColors.textSecondary,
        },
        divider: customColors.divider,
    },
    typography: {
        fontFamily: `'Kanit', sans-serif`,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    spacing: 4,
});

export { customColors };
export default theme;

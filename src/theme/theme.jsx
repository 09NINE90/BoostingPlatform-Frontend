import {createTheme} from "@mui/material";

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
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInputBase-input': {
                        fontFamily: `'Kanit', sans-serif`,
                        fontWeight: 300,
                    },
                    '& .MuiInputLabel-root': {
                        fontFamily: `'Kanit', sans-serif`,
                        fontWeight: 300,
                    },
                    '& .MuiFormHelperText-root': {
                        fontFamily: `'Kanit', sans-serif`,
                        fontWeight: 300,
                    },
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontFamily: `'Kanit', sans-serif`,
                    fontWeight: 300,
                    fontSize: '0.8rem',
                    backgroundColor: customColors.divider,
                    padding: '6px 8px',
                    borderRadius: '4px',
                    maxWidth: '300px',
                },
                arrow: {
                    color: customColors.divider,
                },
            },
            defaultProps: {
                placement: 'top-start',
                arrow: true,
                enterDelay: 500,
                leaveDelay: 200,
            },
        }
    },
    spacing: 4,
});

export {customColors};
export default theme;

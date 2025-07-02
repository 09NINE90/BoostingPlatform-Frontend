import {createTheme} from "@mui/material";

const customColors = {
    primary: '#FD980B',
    secondary: '#ca7807',
    third: '#00A0FF',
    thirdHover: '#006095',
    completed: '#CBF45A',
    customRed: '#e64949',
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
        statuses: {
            completed: customColors.completed,
            red: customColors.customRed
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
            hover: customColors.thirdHover,
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
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            }
        },
        MuiIconButton:{
            defaultProps: {
                disableRipple: true,
            }
        }
    },
    spacing: 4,
});

export {customColors};
export default theme;

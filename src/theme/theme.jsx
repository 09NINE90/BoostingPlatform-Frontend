import { createTheme } from "@mui/material";

const testPallete = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#9C27B0', 
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D08D4E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#110134',
      paper: '#19054D',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#BDBDBD',
    },
    divider: '#443D54',
  },
}


const theme = createTheme({
  ...testPallete,
  spacing: 4,
});
export default theme;


import { createTheme } from '@mui/material';
import { green, cyan } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: green[700],
            dark: green[800],
            light: green[500],
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#FFFFFF'            
        },
        background:{
            default: '#F7F6F3',
            paper: '#FFFFFF',
        }
    }
});
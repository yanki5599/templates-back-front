// theme.ts
import { createTheme, ThemeOptions } from "@mui/material/styles";

// Define a custom theme for Material-UI
declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      light: string;
      main: string;
      dark: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      light?: string;
      main?: string;
      dark?: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    custom: {
      light: "#f3e5f5",
      main: "#ce93d8",
      dark: "#ab47bc",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;

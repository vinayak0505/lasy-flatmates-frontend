import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    container?: {
      backgroundColor: string;
    };
  }
  interface PaletteOptions {
    container?: {
      backgroundColor: string;
    };
  }
}

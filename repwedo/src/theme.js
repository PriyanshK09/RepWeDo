export default function themeSettings(mode) {
    return {
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              primary: {
                main: '#1976d2',
              },
              background: {
                default: '#f5f5f5',
                paper: '#ffffff',
              },
            }
          : {
              primary: {
                main: '#90caf9',
              },
              background: {
                default: '#121212',
                paper: '#1d1d1d',
              },
            }),
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
      },
    };
  }
  
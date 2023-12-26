import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React from 'react';
import TopNavBar from './Navigation/TopNavBar';
import SideNav from './Navigation/SideNav';
import { Outlet } from 'react-router-dom';
import Main from './Navigation/Main';
import { ColorModeContext } from '../data/ColorModeContext';

export default function AppLayout() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  /**
   * TODO:  Refactor this into a custom theme provider
   * @see: https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode
   */
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <TopNavBar open={open} setOpen={setOpen} />
          <SideNav open={open} setOpen={setOpen} />
          <Main open={open}>
            <Outlet />
          </Main>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

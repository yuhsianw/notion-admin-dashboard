import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import TopNavBar from './Navigation/TopNavBar';
import SideNav from './Navigation/SideNav';
import { Outlet } from 'react-router-dom';
import Main from './Navigation/Main';

const defaultTheme = createTheme();
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

export default function AppLayout() {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopNavBar open={open} setOpen={setOpen} />
        <SideNav open={open} setOpen={setOpen} />
        <Main open={open}>
          <Outlet />
        </Main>
      </Box>
    </ThemeProvider>
  );
}

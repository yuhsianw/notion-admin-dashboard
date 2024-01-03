import { Box, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { ColorModeContext } from '../../data/ColorModeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function ColorModeToggle() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const toCapitalCase = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        ml: 'auto',
      }}>
      {toCapitalCase(`${theme.palette.mode} Mode`)}
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit">
        {theme.palette.mode === 'dark' ? (
          <Brightness4Icon />
        ) : (
          <Brightness7Icon />
        )}
      </IconButton>
    </Box>
  );
}

import React, { PropsWithChildren } from 'react';
import DrawerHeader from './DrawerHeader';
import { Link, Typography } from '@mui/material';
import { MainStyledComponent } from '../StyledComponents';

interface MainProps {
  open: boolean;
}

export default function Main({ open, children }: PropsWithChildren<MainProps>) {
  return (
    <>
      <MainStyledComponent open={open}>
        <DrawerHeader />
        {children}
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ pt: 4 }}>
          {'Copyright © '}
          <Link
            color="inherit"
            href="https://github.com/yuhsianw/notion-admin-dashboard">
            Frank Wang
          </Link>{' '}
          {new Date().getFullYear()}
          {'. This is a demo site created for the Notion team with ❤️.'}
        </Typography>
      </MainStyledComponent>
    </>
  );
}

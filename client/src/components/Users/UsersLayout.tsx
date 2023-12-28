import { Typography } from '@mui/material';
import React from 'react';
import UserTable from './UsersTable';

export default function UsersLayout() {
  return (
    <>
      <Typography variant="h6" component="h1" gutterBottom>
        Users
      </Typography>
      <UserTable />
    </>
  );
}

import React from 'react';
import { Typography } from '@mui/material';
import WorkspaceTable from './WorkspacesTable';

export default function WorkspacesLayout() {
  return (
    <>
      <Typography variant="h6" component="h1" gutterBottom>
        Workspaces
      </Typography>
      <WorkspaceTable />
    </>
  );
}

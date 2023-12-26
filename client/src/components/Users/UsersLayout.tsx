import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';

export default function UsersLayout() {
  const rows: GridRowsProp = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  return (
    <>
      <Typography variant="h6" component="h1" gutterBottom>
        Users
      </Typography>
      <DataGrid rows={rows} columns={columns} />
    </>
  );
}

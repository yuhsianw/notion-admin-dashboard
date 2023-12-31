import React, { useEffect, useRef, useState } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../../services/userService';
import Table from '../Table/Table';
import { GetUserDto } from '../../dto/get-user.dto';
import { DEFAULT_USER_ROWS, POLLING_INTERVAL } from '../../config/constants';
import { renderEmail } from '@mui/x-data-grid-generator';

export interface UserGridRow {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  workspaces: string[];
}

export default function UserTable() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  /**
   * `rowsRef` is used to keep track of the rows with an `useEffect` hook, which
   * will allow the pollingInterval to access the latest rows.
   */
  const rowsRef = useRef(rows);

  /**
   * TODO:  Add column validation https://mui.com/x/react-data-grid/filtering/quick-filter/#custom-filtering-logic
   * TODO:  Add avatar column
   * - https://mui.com/x/react-data-grid/components/#footer
   * - https://github.com/mui/mui-x/blob/a769a9164c233116a7186e4e65d56d83003c0b6f/packages/grid/x-data-grid-generator/src/columns/employees.columns.tsx#L38C1-L38C1
   */
  const columns: GridColDef[] = [
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 180,
      editable: true,
    },
    { field: 'lastName', headerName: 'Last Name', width: 180, editable: true },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      editable: true,
      renderCell: renderEmail,
    },
    /**
     * TODO:  Multiple select for workspaces
     * @see: single select example
     * - https://mui.com/x/react-data-grid/filtering/quick-filter/#custom-filtering-logic
     * - https://github.com/mui/mui-x/blob/a769a9164c233116a7186e4e65d56d83003c0b6f/packages/grid/x-data-grid-generator/src/columns/employees.columns.tsx#L112C4-L112C4
     * @see: multiple select example https://mui.com/material-ui/react-select/#chip
     */
    {
      field: 'workspaces',
      headerName: 'Workspaces',
      width: 220,
      editable: true,
    },
  ];

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const fetchRows = () => {
    getAllUsers()
      .then((data) => {
        // keep the newly added unsaved rows
        const newRows = rowsRef.current.filter((row) => row.isNew);
        const updatedRows = data.map((user: GetUserDto): UserGridRow => {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            workspaces: user.workspaces,
          };
        });
        setRows([...updatedRows, ...newRows]);
      })
      .catch((error) => {
        console.log('error', error);
        // TODO:  https://mui.com/material-ui/react-alert/
      });
  };

  useEffect(() => {
    fetchRows();

    const pollingInterval = setInterval(() => {
      fetchRows();
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <Table
      defaultRows={DEFAULT_USER_ROWS}
      rows={rows}
      columns={columns}
      setRows={setRows}
      saveRow={createUser}
      updateRow={updateUser}
      deleteRow={deleteUser}
    />
  );
}

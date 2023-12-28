import React, { useEffect, useRef, useState } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../../services/userService';
import Table from '../Table/Table';
import { GetUserDto } from '../../dtos/get-user.dto';
import { POLLING_INTERVAL } from '../../config/constants';

interface UserGridRow {
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
    },
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

  const updateRows = () => {
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
    updateRows();

    const pollingInterval = setInterval(() => {
      updateRows();
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  return (
    <Table
      rows={rows}
      columns={columns}
      setRows={setRows}
      saveRow={createUser}
      updateRow={updateUser}
      deleteRow={deleteUser}
    />
  );
}

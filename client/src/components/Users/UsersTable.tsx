import React, { useEffect, useRef, useState } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from '../../services/userService';
import Table from '../Table/Table';
import { DEFAULT_USER_ROWS, POLLING_INTERVAL } from '../../config/constants';
import { renderEmail } from '@mui/x-data-grid-generator';
import MultipleSelectEditCell, {
  MultipleSelectEditCellOption,
} from '../Table/MultipleSelectEditCell';
import workspaceService from '../../services/workspaceService';
import GetWorkspaceDto from '../../dto/get-workspace.dto';
import { GetUserDto } from '../../dto/get-user.dto';

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
  const [workspaceOptions, setWorkspaceOptions] = useState<
    MultipleSelectEditCellOption[]
  >([]);

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
    {
      field: 'workspaces',
      headerName: 'Workspaces',
      type: 'singleSelect',
      width: 220,
      editable: true,
      sortable: false,
      valueOptions: workspaceOptions,
      valueFormatter: ({ value }) => {
        return value
          .map((workspaceId) => {
            const workspace = workspaceOptions.find(
              (workspace) => workspace.value === workspaceId,
            );
            return workspace ? workspace.label : '';
          })
          .join(', ');
      },
      renderEditCell: (params) => (
        <MultipleSelectEditCell
          options={workspaceOptions}
          value={params.value}
          {...params}></MultipleSelectEditCell>
      ),
      // TODO: Allow filtering by workspaces
      filterable: false,
      // filterOperators: []
    } as GridColDef<any, GetWorkspaceDto['members'], any>,
  ];

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
    workspaceService.getAllWorkspaces().then((data) => {
      const options = data.map((workspace) => {
        return {
          value: workspace.id,
          label: workspace.name,
        };
      });
      setWorkspaceOptions(options);
    });
  }, []);

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

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

import React, { useEffect, useRef, useState } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Table from '../Table/Table';
import { DEFAULT_WORKSPACE_ROWS, POLLING_INTERVAL } from '../../config';
import {
  createWorkspace,
  deleteWorkspace,
  getAllWorkspaces,
  updateWorkspace,
} from '../../services/workspaceService';
import GetWorkspaceDto from '../../dto/get-workspace.dto';
import userService from '../../services/userService';
import { GetUserDto } from '../../dto/get-user.dto';
import MultipleSelectEditCell, {
  MultipleSelectEditCellOption,
} from '../Table/MultipleSelectEditCell';

export interface WorkspaceGridRow {
  id: string;
  name: string;
  domain: string;
  samlEnabled: boolean;
  members: string[];
}

export default function WorkspaceTable() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  /**
   * `rowsRef` is used to keep track of the rows with an `useEffect` hook, which
   * will allow the pollingInterval to access the latest rows.
   */
  const rowsRef = useRef(rows);
  const [userOptions, setUserOptions] = useState<
    MultipleSelectEditCellOption[]
  >([]);
  /**
   * TODO:  Add column validation https://mui.com/x/react-data-grid/filtering/quick-filter/#custom-filtering-logic
   */
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      editable: true,
    },
    { field: 'domain', headerName: 'Domain', width: 180, editable: true },
    {
      field: 'samlEnabled',
      headerName: 'SAML Enabled',
      width: 220,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'members',
      headerName: 'Members',
      type: 'singleSelect',
      width: 220,
      editable: true,
      sortable: false,
      valueOptions: userOptions,
      valueFormatter: ({ value }) => {
        return (
          value
            ?.map((userId) => {
              const user = userOptions.find((user) => user.value === userId);
              return user ? user.label : '';
            })
            .join(', ') ?? ''
        );
      },
      renderEditCell: (params) => (
        <MultipleSelectEditCell
          options={userOptions}
          value={params.value}
          {...params}></MultipleSelectEditCell>
      ),
      // TODO: Allow filtering by members
      filterable: false,
      // filterOperators: []
    } as GridColDef<any, GetUserDto['workspaces'], any>,
  ];

  useEffect(() => {
    userService.getAllUsers().then((data) => {
      const options = data.map((user) => ({
        value: user.id,
        label: `${user.firstName} ${user.lastName}`,
      }));
      setUserOptions(options);
    });
  }, []);

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const fetchRows = () => {
    getAllWorkspaces()
      .then((data) => {
        // keep the newly added unsaved rows
        const newRows = rowsRef.current.filter((row) => row.isNew);
        const updatedRows = data.map(
          (workspace: GetWorkspaceDto): WorkspaceGridRow => {
            return {
              id: workspace.id,
              name: workspace.name,
              domain: workspace.domain,
              samlEnabled: workspace.samlEnabled,
              members: workspace.members,
            };
          },
        );
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
      defaultRows={DEFAULT_WORKSPACE_ROWS}
      rows={rows}
      columns={columns}
      setRows={setRows}
      saveRow={createWorkspace}
      updateRow={updateWorkspace}
      deleteRow={deleteWorkspace}
    />
  );
}

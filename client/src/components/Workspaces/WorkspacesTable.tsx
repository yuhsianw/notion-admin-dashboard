import React, { useEffect, useRef, useState } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Table from '../Table/Table';
import { POLLING_INTERVAL } from '../../config/constants';
import {
  createWorkspace,
  deleteWorkspace,
  getAllWorkspaces,
  updateWorkspace,
} from '../../services/workspaceService';
import GetWorkspaceDto from '../../dto/get-workspace.dto';

interface WorkspaceGridRow {
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
      editable: true,
    },
    /**
     * TODO:  Multiple select for members with avatar
     * @see: single select example
     * - https://mui.com/x/react-data-grid/filtering/quick-filter/#custom-filtering-logic
     * - https://github.com/mui/mui-x/blob/a769a9164c233116a7186e4e65d56d83003c0b6f/packages/grid/x-data-grid-generator/src/columns/employees.columns.tsx#L112C4-L112C4
     * @see: multiple select example https://mui.com/material-ui/react-select/#chip
     */
    {
      field: 'members',
      headerName: 'Members',
      width: 220,
      editable: true,
    },
  ];

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const updateRows = () => {
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
      saveRow={createWorkspace}
      updateRow={updateWorkspace}
      deleteRow={deleteWorkspace}
    />
  );
}

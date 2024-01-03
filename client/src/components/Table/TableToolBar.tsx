/**
 * A custom toolbar used by the `Table` component to create new rows.
 * @see: https://mui.com/x/react-data-grid/editing/#full-featured-crud
 * TODO:  Add columns button https://mui.com/x/react-data-grid/column-visibility/
 * TODO:  Add export button https://mui.com/x/react-data-grid/export/
 * TODO:  Add batch control https://mui.com/x/react-data-grid/row-selection/
 * TODO:  Add custom views https://mui.com/x/react-data-grid/state/#restore-the-state-with-apiref
 * TODO:  Add quick filter https://mui.com/x/react-data-grid/filtering/quick-filter/
 * 
 */
import { Button } from '@mui/material';
import {
  GridRowsProp,
  GridRowModesModel,
  GridColDef,
  GridRowModes,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import React from 'react';
import CreateWorkspaceDto from '../../dto/create-workspace.dto';
import { WorkspaceGridRow } from '../Workspaces/WorkspacesTable';
import LoadingButton from '@mui/lab/LoadingButton';

interface TableToolbarProps {
  rows: GridRowsProp;
  defaultRows: WorkspaceGridRow[];
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  deleteRow: (id: string) => void;
  saveRow: (row: CreateWorkspaceDto) => Promise<CreateWorkspaceDto | null>;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  columns: GridColDef[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchRows: () => void;
}

export default function TableToolbar({
  defaultRows,
  rows,
  setRows,
  deleteRow,
  saveRow,
  setRowModesModel,
  columns,
  loading,
  setLoading,
  fetchRows,
}: TableToolbarProps) {
  const handleAddClick = () => {
    /**
     * IDs are generated both here and in the server, where the latter persists
     * once synced. This hybrid approach has the following benefits:
     * Server-Generated IDs:
     * - Security: Prevents malicious users from tampering ID for manipulation.
     * Client-Generated IDs:
     * - Offline Usage: Allows users to create new rows while offline.
     * - Performance: Can reduce server load.
     *
     * `randomId` generates a GUID.
     * @see: https://github.com/mui/mui-x/blob/e5d35580b78f5b8bb97ebf0cab2a3775f015418a/packages/grid/x-data-grid-generator/src/services/random-generator.ts#L118
     */
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      { id, isNew: true },
      // { id, firstName: 'GG', lastName: 'GG', email: 'gg@com', isNew: true },
    ]);
    setRowModesModel((oldModel) => {
      return {
        ...oldModel,
        [id]: { mode: GridRowModes.Edit },
        [id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0].field },
      };
    });
  };

  const resetRows = async () => {
    for (const row of rows) {
      await deleteRow(row.id);
    }
    setRows(() => []);
    setRowModesModel(() => ({}));
    return Promise.all(defaultRows.map((row) => saveRow(row)));
  };

  /**
   * Resets table to default rows.
   * TODO: This should be done by sending a single request to the server.
   * TODO: Add confirm modal
   */
  const handleResetClick = async () => {
    setLoading(true);
    await resetRows();
    fetchRows();
    setLoading(false);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleAddClick}>
        Add
      </Button>
      {loading ? (
        <LoadingButton
          loading
          loadingPosition="start"
          color="primary"
          startIcon={<RestartAltIcon />}>
          Reset
        </LoadingButton>
      ) : (
        <Button
          color="primary"
          startIcon={<RestartAltIcon />}
          onClick={handleResetClick}>
          Reset
        </Button>
      )}
    </GridToolbarContainer>
  );
}

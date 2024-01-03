/**
 * A Table component that supports CRUD operations.
 * @see: https://mui.com/x/react-data-grid/editing/#full-featured-crud
 * TODO: Allow copy and paste https://mui.com/x/react-data-grid/clipboard/
 * TODO: Add status bar for last polling time https://mui.com/x/react-data-grid/components/#footer
 * TODO: Add loading overlay https://mui.com/x/react-data-grid/components/#footer
 * TODO: Add reset button to trigger database migration to reset to default
 */
import React, { useState } from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
} from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import TableToolbar from './TableToolBar';
import { GetUserDto } from '../../dto/get-user.dto';
import GetWorkspaceDto from '../../dto/get-workspace.dto';
import { WorkspaceGridRow } from '../Workspaces/WorkspacesTable';
import { UserGridRow } from '../Users/UsersTable';

interface TableProps {
  defaultRows: WorkspaceGridRow[] | UserGridRow[];
  rows: GridRowsProp;
  setRows: (rows: GridRowsProp) => void;
  columns: GridColDef[];
  saveRow: (row: GridRowModel) => Promise<GetUserDto | GetWorkspaceDto | null>;
  updateRow: (
    id: string,
    row: GridRowModel,
  ) => Promise<GetUserDto | GetWorkspaceDto | null>;
  deleteRow: (id: string) => void;
}

export default function Table({
  defaultRows,
  rows,
  setRows,
  columns,
  saveRow,
  updateRow,
  deleteRow,
}: TableProps) {
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    try {
      // QUESTION: Should we use `id.toString()` or change id type to `string`?
      await deleteRow(id.toString());
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.log('error', error);
      // TODO: https://mui.com/material-ui/react-alert/
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const updateToServer = async (id: GridRowId, newRow: GridRowModel) => {
    if (newRow!.isNew) {
      await saveRow(newRow!);
    } else {
      await updateRow(id.toString(), newRow!);
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    console.log('newRow', newRow);
    try {
      await updateToServer(newRow.id, newRow);
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    } catch (error) {
      console.log('error', error);

      // TODO: https://mui.com/material-ui/react-alert/

      // BUG: Not taking effect
      setRowModesModel({
        ...rowModesModel,
        [newRow.id]: { mode: GridRowModes.Edit },
      });

      // Retain isNew flag
      return newRow;
    }
  };

  // BUG: This is not fired at all.
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // TODO: add tooltips
  const TableActions = ({ id }: { id: GridRowId }) => {
    const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

    if (isInEditMode) {
      return [
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          sx={{
            color: 'primary.main',
          }}
          onClick={handleSaveClick(id)}
        />,
        <GridActionsCellItem
          icon={<CancelIcon />}
          label="Cancel"
          className="textPrimary"
          onClick={handleCancelClick(id)}
          color="inherit"
        />,
      ];
    }

    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={handleEditClick(id)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleDeleteClick(id)}
        color="inherit"
      />,
    ];
  };

  const actionsCol: GridColDef = {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: TableActions,
  };

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}>
      <DataGrid
        rows={rows}
        columns={[...columns, actionsCol]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: TableToolbar,
        }}
        slotProps={{
          toolbar: {
            defaultRows,
            rows,
            setRows,
            deleteRow,
            saveRow,
            setRowModesModel,
            columns,
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 25, 50]}
      />
    </Box>
  );
}

/**
 * A Table component that supports CRUD operations.
 * @see: https://mui.com/x/react-data-grid/editing/#full-featured-crud
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
import EditToolbar from './EditToolBar';
import { GetUserDto } from '../../dtos/get-user.dto';

interface TableProps {
  rows: GridRowsProp;
  setRows: (rows: GridRowsProp) => void;
  columns: GridColDef[];
  saveRow: (row: GridRowModel) => Promise<GetUserDto | null>;
  updateRow: (id: string, row: GridRowModel) => Promise<GetUserDto | null>;
  deleteRow: (id: string) => void;
}

export default function Table({
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

      // TODO:  https://mui.com/material-ui/react-alert/

      // BUG:  Not taking effect
      setRowModesModel({
        ...rowModesModel,
        [newRow.id]: { mode: GridRowModes.Edit },
      });

      // Retain isNew flag
      return newRow;
    }
  };

  // BUG:  This is not fired at all.
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, columns },
        }}
      />
    </Box>
  );
}

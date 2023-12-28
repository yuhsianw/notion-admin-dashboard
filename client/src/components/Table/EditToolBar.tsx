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
import React from 'react';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  columns: GridColDef[];
}

export default function EditToolbar({
  setRows,
  setRowModesModel,
  columns,
}: EditToolbarProps) {
  const handleClick = () => {
    /**
     * `randomId` generates a GUID.
     * @see: https://github.com/mui/mui-x/blob/e5d35580b78f5b8bb97ebf0cab2a3775f015418a/packages/grid/x-data-grid-generator/src/services/random-generator.ts#L118
     */
    const id = randomId();
    setRows((oldRows) => [
      ...oldRows,
      // { id, isNew: true },
      { id, firstName: 'GG', lastName: 'GG', email: 'gg@com', isNew: true },
    ]);
    setRowModesModel((oldModel) => {
      return {
        ...oldModel,
        [id]: { mode: GridRowModes.Edit },
        [id]: { mode: GridRowModes.Edit, fieldToFocus: columns[0].field },
      };
    });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add
      </Button>
    </GridToolbarContainer>
  );
}

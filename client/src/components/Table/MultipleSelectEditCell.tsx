import { SelectChangeEvent, Select, MenuItem, Checkbox } from '@mui/material';
import { GridRenderEditCellParams } from '@mui/x-data-grid';
import React from 'react';
import {
  EDIT_CELL_ITEM_HEIGHT,
  EDIT_CELL_ITEM_PADDING_TOP,
} from '../../config';

export interface MultipleSelectEditCellOption {
  value: string;
  label: string;
}

/**
 * Custom edit cell for multiple select.
 * @see: https://mui.com/material-ui/react-select/#multiple-select
 * @see: https://github.com/mui/mui-x/issues/4410#issuecomment-1095104938
 * @param param0
 * @returns
 */
export default function MultipleSelectEditCell({
  id,
  value = [],
  field,
  options,
  api,
}: GridRenderEditCellParams & { options: MultipleSelectEditCellOption[] }) {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    api.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
  };

  return (
    <Select
      labelId="multiple-name-label"
      id="multiple-name"
      multiple
      value={value}
      onChange={handleChange}
      sx={{ width: '100%' }}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: EDIT_CELL_ITEM_HEIGHT * 4.5 + EDIT_CELL_ITEM_PADDING_TOP,
            width: 250,
          },
        },
      }}
      renderValue={(selectedValues) => {
        // TODO: Allow render format to be passed in with the `children` prop:
        // TODO: - Use tags with remove button and dynamical row height in edit mode for workspaces.
        // TODO: - Use stacked avatar for members with highlight + tooltip on hover.
        // return (
        //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        //     {selected.map((value) => (
        //       <Chip key={value} label={getSelectedLabel(value)} />
        //     ))}
        //   </Box>
        // );
        return selectedValues
          .map((value) => {
            const option = options.find((option) => option.value === value);
            return option?.label ?? '';
          })
          .join(', ');
      }}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          <Checkbox checked={value.indexOf(option.value) > -1} />
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

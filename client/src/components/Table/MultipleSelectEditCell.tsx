import { SelectChangeEvent, Select, MenuItem, Checkbox } from '@mui/material';
import { GridRenderEditCellParams, useGridApiContext } from '@mui/x-data-grid';
import React from 'react';
import { GetUserDto } from '../../dto/get-user.dto';
import {
  EDIT_CELL_ITEM_HEIGHT,
  EDIT_CELL_ITEM_PADDING_TOP,
} from '../../config/constants';

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
  userOptions,
}: GridRenderEditCellParams & { userOptions: GetUserDto[] }) {
  const apiRef = useGridApiContext();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
  };

  const getSelectedLabel = (value: string) => {
    const option = userOptions.find((user) => user.id === value);
    return option ? getOptionLabel(option) : '';
  };

  const getOptionLabel = (option: GetUserDto) =>
    `${option.firstName} ${option.lastName}`;

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
      renderValue={(selected) => selected.map(getSelectedLabel).join(', ')}>
      {userOptions.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          <Checkbox checked={value.indexOf(option.id) > -1} />
          {getOptionLabel(option)}
        </MenuItem>
      ))}
    </Select>
  );
}

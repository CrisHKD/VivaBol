import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DepatamentoSelect() {
  const [dapartamento, setDepartamento] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDepartamento(event.target.value as string);
  };

  return (
    <Box sx={{minWidth: 120 }}>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ height: 48 }}
          value={dapartamento}
          label="Departamento"
          onChange={handleChange}
        >
          <MenuItem value={"Beni"}>Beni</MenuItem>
          <MenuItem value={"Chuquisaca"}>Chuquisaca</MenuItem>
          <MenuItem value={"Cochabamba"}>Cochabamba</MenuItem>
          <MenuItem value={"La Paz"}>La Paz</MenuItem>
          <MenuItem value={"Oruro"}>Oruro</MenuItem>
          <MenuItem value={"Pando"}>Pando</MenuItem>
          <MenuItem value={"Potosi"}>Porosí</MenuItem>
          <MenuItem value={"Santa Cruz"}>Santa Cruz</MenuItem>
          <MenuItem value={"Tarija"}>Tarija</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
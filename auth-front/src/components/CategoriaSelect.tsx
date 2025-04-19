import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';

const categories = [
  { label: 'Deportes', value: 'sports' },
  { label: 'Académicos', value: 'academic' },
  { label: 'Culturales', value: 'cultural' },
  { label: 'Gastronómicos', value: 'gastronomy' },
  { label: 'Musicales', value: 'music' },
];

export default function CategorySelect() {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const value = event.target.value as string[];
    setSelectedCategories(value);
  };

  const handleToggleAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map(category => category.value));
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="category-select-label">Categorías de Eventos</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          sx={{ height: 48 }}
          multiple
          value={selectedCategories}
          onChange={handleChange}
          renderValue={(selected) => {
            return selected.length ? selected.join(', ') : 'Seleccionar categorías';
          }}
        >
          <MenuItem key="all" value="all">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedCategories.length === categories.length}
                  onChange={handleToggleAll}
                  color="primary"
                />
              }
              label="Todas las categorías"
            />
          </MenuItem>

          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>
              <Checkbox checked={selectedCategories.indexOf(category.value) > -1} />
              <ListItemText primary={category.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

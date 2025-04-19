import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent: React.FC = () => {
  const [searchText, setSearchText] = React.useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <TextField
      label="Buscar eventos"
      value={searchText}
      onChange={handleSearchChange}
      fullWidth
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
        sx: { height: 48, padding: '0 14px' }, // Ajusta el alto y el padding
      }}
      sx={{
        width: 300,  // Ajusta el ancho del campo de texto
      }}
    />
  );
};

export default SearchComponent;
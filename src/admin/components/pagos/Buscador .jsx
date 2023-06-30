/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
    
const Buscador = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <TextField
      label="Buscar"
      variant="outlined"
      value={searchText}
      onChange={handleChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleSearch();
        }
      }}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default Buscador;
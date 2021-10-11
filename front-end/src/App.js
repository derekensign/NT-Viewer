import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          width: 1,
          height: 200,
          bgcolor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
      <Grid container spacing={2}>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Country</InputLabel>
          <Select>
            <MenuItem>USA</MenuItem>
            <MenuItem>Mexico</MenuItem>
          </Select>
          <Grid item xs={5}>
            <Select />
          </Grid>
          <Grid item xs={5}>
            <Select />
          </Grid>
        </FormControl>
      </Grid>
    </div>

  );
}

export default App;

import React from 'react';
import Box from '@mui/material/Box';
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
    </div>

  );
}

export default App;

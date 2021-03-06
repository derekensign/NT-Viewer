import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Scheduler, {
  SchedulerData, ViewTypes, DATE_FORMAT,
} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick

// must manually import the stylesheets for each plugin
// import '@fullcalendar/core/main.css'; can't resolve this directory?
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import Moment from 'react-moment';
import BigScheduler from './components/BigScheduler';
import { Counter } from './features/counter/Counter';
import players from './players.json';
import './App.css';

function App() {
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState([]);
  const [selectedClub, setSelectedClub] = useState([]);
  const [positionList, setPositionList] = useState([]);
  const [clubList, setClubList] = useState([]);

  console.log(players);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const handlePositionChange = (event) => {
    setSelectedPosition(event.target.value);
  };
  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);
  };

  // function to set position list to state
  const getPositionList = () => {
    // Create Raw Array to push positions into
    const rawPositionArray = [];

    // Iterate through player positions and add them to the rawPositionArray
    players.players.map((player) => (
      player.playerPosition.forEach((position) => {
        rawPositionArray.push(position);
      })
    ));

    // Make new Array of Positions with only Unique Positions
    const positionArray = [...new Set(rawPositionArray)];
    setPositionList(positionArray);
  };

  const getClubList = () => {
    // Create Raw Array to push clubs into
    const rawClubArray = [];

    // Iterate through player clubs and add them to the rawClubArray
    players.players.map((player, i) => (
      rawClubArray.push(player.teamName)
    ));

    // Make new Array of clubs with only Unique Clubs
    const clubArray = [...new Set(rawClubArray)];
    setClubList(clubArray);
  };

  useEffect(() => {
    getPositionList();
    getClubList();
  }, []);

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
      <Grid container spacing={2} p={10}>
        <Grid item xs={4}>
          <FormControl variant="filled" sx={{ width: '75%' }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={selectedCountry}
              defaultValue=""
              onChange={handleCountryChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Mexico">Mexico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="filled" sx={{ width: '75%' }}>
            <InputLabel>Position</InputLabel>
            <Select
              value={selectedPosition}
              defaultValue=""
              onChange={handlePositionChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {positionList.map((position) => (
                // console.log(`"${position}"`)
                <MenuItem defaultValue="" value={position}>{position}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="filled" sx={{ width: '75%' }}>
            <InputLabel>Club</InputLabel>
            <Select
              value={selectedClub}
              defaultValue=""
              onChange={handleClubChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {clubList.map((club) => (
                // console.log(`"${club}"`)
                <MenuItem defaultValue="" value={club}>{club}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <BigScheduler />
      </Grid>
    </div>

  );
}

export default App;

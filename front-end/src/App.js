import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Scheduler, {
  SchedulerData, ViewTypes, DATE_FORMAT
} from 'react-big-scheduler';
import 'react-big-scheduler/lib/css/style.css';
import Moment from 'react-moment';
import { DragDropContext } from 'react-beautiful-dnd';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

function App() {
  const schedulerData = new SchedulerData(new Moment(), ViewTypes.Week);

  const resources = [
    {
      id: 'r0',
      name: 'Resource0',
      groupOnly: true
    },
    {
      id: 'r1',
      name: 'Resource1'
    },
    {
      id: 'r2',
      name: 'Resource2',
      parentId: 'r0'
    },
    {
      id: 'r3',
      name: 'Resource3',
      parentId: 'r4'
    },
    {
      id: 'r4',
      name: 'Resource4',
      parentId: 'r2'
    },
  ];
  schedulerData.setResources(resources);
  // set events here or later,
  // the event array should be sorted in ascending order by event.start property,
  // otherwise there will be some rendering errors
  const events = [
    {
      id: 1,
      start: '2017-12-18 09:30:00',
      end: '2017-12-19 23:30:00',
      resourceId: 'r1',
      title: 'I am finished',
      bgColor: '#D9D9D9'
    },
    {
      id: 2,
      start: '2017-12-18 12:30:00',
      end: '2017-12-26 23:30:00',
      resourceId: 'r2',
      title: 'I am not resizable',
      resizable: false
    },
    {
      id: 3,
      start: '2017-12-19 12:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r3',
      title: 'I am not movable',
      movable: false
    },
    {
      id: 4,
      start: '2017-12-19 14:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r1',
      title: 'I am not start-resizable',
      startResizable: false
    },
    {
      id: 5,
      start: '2017-12-19 15:30:00',
      end: '2017-12-20 23:30:00',
      resourceId: 'r2',
      title: 'R2 has recurring tasks every week on Tuesday, Friday',
      rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
      bgColor: '#f759ab'
    }
  ];
  schedulerData.setEvents(events);

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
            <Select>
              <MenuItem>USA</MenuItem>
              <MenuItem>Mexico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="filled" sx={{ width: '75%' }}>
            <InputLabel>Country</InputLabel>
            <Select>
              <MenuItem>USA</MenuItem>
              <MenuItem>Mexico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="filled" sx={{ width: '75%' }}>
            <InputLabel>Country</InputLabel>
            <Select>
              <MenuItem>USA</MenuItem>
              <MenuItem>Mexico</MenuItem>
            </Select>
          </FormControl>
        </Grid>

      </Grid>
      <DragDropContext>
        <Scheduler
          schedulerData={schedulerData}
        />
      </DragDropContext>
    </div>

  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {
  Container, Typography, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, IconButton, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';

const ManageSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [newShow, setNewShow] = useState('');
  const [newJour, setNewJour] = useState(''); // State for Jour (day of the week)
  const [newStartTime, setNewStartTime] = useState(''); // State for Heure Début (start time)
  const [newEndTime, setNewEndTime] = useState(''); // State for Heure de Fin (end time)
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  const jours = [
    'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'
  ]; // List of days of the week

  useEffect(() => {
    const fetchSchedules = async () => {
      const schedulesCollection = collection(db, 'schedules');
      const schedulesSnapshot = await getDocs(schedulesCollection);
      const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(schedulesList);
    };

    fetchSchedules();
  }, []);

  const handleAddSchedule = async () => {
    if (newShow && newJour && newStartTime && newEndTime) {
      await addDoc(collection(db, 'schedules'), {
        show: newShow,
        jour: newJour,
        startTime: newStartTime,
        endTime: newEndTime
      });
      setNewShow('');
      setNewJour('');
      setNewStartTime('');
      setNewEndTime('');
      setOpen(false);
      const schedulesCollection = collection(db, 'schedules');
      const schedulesSnapshot = await getDocs(schedulesCollection);
      const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(schedulesList);
    }
  };

  const handleEdit = (id, show, jour, startTime, endTime) => {
    setEditId(id);
    setNewShow(show);
    setNewJour(jour);
    setNewStartTime(startTime);
    setNewEndTime(endTime);
    setOpen(true);
  };

  const handleUpdateSchedule = async () => {
    if (editId && newShow && newJour && newStartTime && newEndTime) {
      const scheduleDoc = doc(db, 'schedules', editId);
      await updateDoc(scheduleDoc, {
        show: newShow,
        jour: newJour,
        startTime: newStartTime,
        endTime: newEndTime
      });
      setEditId(null);
      setNewShow('');
      setNewJour('');
      setNewStartTime('');
      setNewEndTime('');
      setOpen(false);
      const schedulesCollection = collection(db, 'schedules');
      const schedulesSnapshot = await getDocs(schedulesCollection);
      const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSchedules(schedulesList);
    }
  };

  const handleDeleteSchedule = async (id) => {
    await deleteDoc(doc(db, 'schedules', id));
    const schedulesCollection = collection(db, 'schedules');
    const schedulesSnapshot = await getDocs(schedulesCollection);
    const schedulesList = schedulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSchedules(schedulesList);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditId(null);
    setNewShow('');
    setNewJour('');
    setNewStartTime('');
    setNewEndTime('');
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredItems = schedules.filter(item =>
    (item.show && item.show.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    {
      name: 'Show',
      selector: row => row.show,
      sortable: true,
    },
    {
      name: 'Jour',
      selector: row => row.jour,
      sortable: true,
    },
    {
      name: 'Heure Début',
      selector: row => row.startTime,
      sortable: true,
    },
    {
      name: 'Heure de Fin',
      selector: row => row.endTime,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(row.id, row.show, row.jour, row.startTime, row.endTime)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDeleteSchedule(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Schedule
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add Schedule
        </Button>
        <TextField
          label="Filter records"
          variant="outlined"
          size="small"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <Button variant="contained" color="primary" startIcon={<PrintIcon />} onClick={handlePrint}>
          Print
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        paginationRowsPerPageOptions={[5, 10, 15]}
        paginationPerPage={10}
        paginationComponentOptions={{
          rowsPerPageText: 'Show',
          rangeSeparatorText: 'of',
        }}
      />

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editId ? 'Edit Schedule' : 'Add Schedule'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Show"
            type="text"
            fullWidth
            value={newShow}
            onChange={(e) => setNewShow(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Jour</InputLabel>
            <Select
              value={newJour}
              onChange={(e) => setNewJour(e.target.value)}
            >
              {jours.map((jour) => (
                <MenuItem key={jour} value={jour}>
                  {jour}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Heure Début"
            type="time"
            fullWidth
            value={newStartTime}
            onChange={(e) => setNewStartTime(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Heure de Fin"
            type="time"
            fullWidth
            value={newEndTime}
            onChange={(e) => setNewEndTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={editId ? handleUpdateSchedule : handleAddSchedule} color="primary">
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageSchedule;

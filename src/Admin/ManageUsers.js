import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import {
  Container, Typography, Button, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, IconButton, Avatar
} from '@mui/material';
import DataTable from 'react-data-table-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhoto, setNewPhoto] = useState('');
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (newName && newEmail && newPassword && newPhoto) {
      await addDoc(collection(db, 'users'), {
        name: newName,
        email: newEmail,
        password: newPassword,
        photo: newPhoto
      });
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewPhoto('');
      setOpen(false);
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    }
  };

  const handleEdit = (id, name, email, password, photo) => {
    setEditId(id);
    setNewName(name);
    setNewEmail(email);
    setNewPassword(password);
    setNewPhoto(photo);
    setOpen(true);
  };

  const handleUpdateUser = async () => {
    if (editId && newName && newEmail && newPassword && newPhoto) {
      const userDoc = doc(db, 'users', editId);
      await updateDoc(userDoc, {
        name: newName,
        email: newEmail,
        password: newPassword,
        photo: newPhoto
      });
      setEditId(null);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewPhoto('');
      setOpen(false);
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersList);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setEditId(null);
    setNewName('');
    setNewEmail('');
    setNewPassword('');
    setNewPhoto('');
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredItems = users.filter(item =>
    (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
    (item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    {
      name: 'Photo',
      selector: row => <Avatar src={row.photo} alt={row.name} />,
      sortable: false,
      width: '70px',
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Password',
      selector: row => row.password,
      sortable: false,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(row.id, row.name, row.email, row.password, row.photo)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDeleteUser(row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add User
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
        <DialogTitle>{editId ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Photo URL"
            type="text"
            fullWidth
            value={newPhoto}
            onChange={(e) => setNewPhoto(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={editId ? handleUpdateUser : handleAddUser} color="primary">
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageUsers;

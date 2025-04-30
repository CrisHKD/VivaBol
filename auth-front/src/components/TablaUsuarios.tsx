import { useState, useEffect } from 'react';
import { Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';

import axios from 'axios';
import { API_URL } from "../auth/constants";
import EditUserForm from '../components/EditarUsuario';

const UsersTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [openEditForm, setOpenEditForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleEditClick = (userId: number) => {
    setSelectedUserId(userId); // Establecer el ID del usuario que se va a editar
    setOpenEditForm(true); // Abrir el formulario de edición
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/usuarios`, {
        params: { nombre, apellido, email },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [nombre, apellido, email]);

  const roles = [
    { id: 1, nombre: "Usuario" },
    { id: 2, nombre: "Administrador" },
    { id: 3, nombre: "UsCultural" },
    { id: 4, nombre: "UsAcademico" },
    { id: 5, nombre: "UsOrganizador" },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      {/* Filtros de búsqueda */}
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Nombre"
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
        />
        {openEditForm && selectedUserId !== null && (
          <EditUserForm userId={selectedUserId} onClose={() => setOpenEditForm(false)} />
        )}
        <TextField
          label="Apellido"
          variant="outlined"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          fullWidth
        />
        <TextField
          label="Correo"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </Box>

     

      {/* Tabla de usuarios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol ID</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nombres}</TableCell>
                <TableCell>{user.apellidos}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {roles.find(role => role.id === user.rol_id)?.nombre || 'Rol no encontrado'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(user.id)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;

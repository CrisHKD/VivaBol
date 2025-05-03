import { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import axios from 'axios';
import { API_URL } from "../auth/constants";
import EditUserForm from '../components/EditarUsuario';
import AgregarOrganizadorForm from '../components/AgregarOrganizador';

const UsersTable = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [openEditForm, setOpenEditForm] = useState(false);
  const [openOrgForm, setOpenOrgForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleEditClick = (userId: number) => {
    setSelectedUserId(userId);
    setOpenEditForm(true);
  };

  const handleOrgClick = (userId: number) => {
    setSelectedUserId(userId);
    setOpenOrgForm(true);
  };

  const fetchUsers = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.get(`${API_URL}/usuarios`, {
        params: { nombre, apellido, email, },
      });
      setUsers(response.data);
      console.log(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setUsers([]); // asegúrate de vaciar el arreglo
        setErrorMsg(error.response.data?.error || 'No se encontraron usuarios');
      } else {
        console.error('Error al obtener usuarios:', error);
        setUsers([]); // seguridad extra
        setErrorMsg('Ocurrió un error al obtener los usuarios');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchUsers();
    }
  };

  const handleEliminarOrganizador = async (usuarioId: number) => {
    try {
      await axios.delete(`${API_URL}/usuarios/organizadores`, {
        data: { usuario_id: usuarioId },
      });
      alert("Organizador eliminado correctamente");
      fetchUsers();
      // Opcional: recargar usuarios
    } catch (err) {
      console.error("Error al eliminar organizador:", err);
      alert("No se pudo eliminar el organizador");
    }
  };

  const roles = [
    { id: 1, nombre: "Usuario" },
    { id: 2, nombre: "Administrador" },
    { id: 3, nombre: "UsCultural" },
    { id: 4, nombre: "UsAcademico" },
    { id: 5, nombre: "UsOrganizador" },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Nombre"
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
        />
        <TextField
          label="Apellido"
          variant="outlined"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
        />
        <TextField
          label="Correo"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={fetchUsers}
        >
          Buscar
        </Button>
      </Box>

      {openEditForm && selectedUserId !== null && (
        <EditUserForm userId={selectedUserId} onClose={() => setOpenEditForm(false)} />
      )}

      {openOrgForm && selectedUserId !== null && (
        <AgregarOrganizadorForm usuarioId={selectedUserId} onClose={() => {setOpenOrgForm(false);fetchUsers();}} />
      )}

      {errorMsg && <Box mb={2} color="error.main">{errorMsg}</Box>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombres</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol ID</TableCell>
              <TableCell>Opciones</TableCell>
              <TableCell>Organizador</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
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
                  <TableCell>
                    {user.esOrganizador ? (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleEliminarOrganizador(user.id)} // Eliminar
                      >
                        Borrar org.
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOrgClick(user.id)} // Registrar
                      >
                        Hacer org.
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              !loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center">No hay usuarios para mostrar</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;

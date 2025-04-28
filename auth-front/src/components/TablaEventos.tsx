import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { API_URL } from "../auth/constants";
import { useEffect } from 'react';
import Button from '@mui/material/Button';

import EdicionEventos from '../layout/EdicionEventos';
import CrearEvento from '../layout/CrearEvento';

import AddIcon from '@mui/icons-material/Add';

interface Column {
  //id: 'name' | 'code' | 'population' | 'size' | 'density';
  id: 'title' | 'description' | 'date' | 'capacity' | 'department' | 'location' | 'type' | 'status' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'title', label: 'Tutulo', minWidth: 120 },
  { id: 'description', label: 'Descripcion', minWidth: 100 },
  {
    id: 'date',
    label: 'Fecha',
    minWidth: 110,
  },
  {
    id: 'capacity',
    label: 'Capacidad',
    minWidth: 50,
  },
  {
    id: 'department',
    label: 'Departamento',
    minWidth: 110,
  },
  {
    id: 'location',
    label: 'Ubicacion',
    minWidth: 100,
  },
  {
    id: 'type',
    label: 'Categoria',
    minWidth: 100,
  },
  {
    id: 'status',
    label: 'Estado',
    minWidth: 100,
  },
  {
    id: 'actions',
    label: 'Acciones',
    minWidth: 100,
  },
];

interface Data {
  id: number,
  title: string,
  description: string,
  date: string,
  capacity: number,
  department: string,
  location: string,
  type: number,
  status: number,
}

function createData(
  id: number,
  title: string,
  description: string,
  date: string,
  capacity: number,
  department: string,
  location: string,
  type: number,
  status: number,
): Data {
  return {id, title, description, date, capacity, department, location, type, status };
}


export default function TablaEventos() {
  //Paginacion
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //Columnas tipo []
  const [rows, setRows] = React.useState<Data[]>([]);

  //Formulario
  const [showModal, setShowModal] = React.useState(false); // Controla si mostrar el Box
  const [selectedEvent, setSelectedEvent] = React.useState<Data | null>(null); // Evento seleccionado

  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen(!isOpen); // Cambia el estado para mostrar u ocultar el formulario
  };


  const handleEditar = (evento: Data) => {
    setSelectedEvent(evento);
    setShowModal(true); 
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const res = await axios.get(`${API_URL}/eventos/todos?categoria_id=2&categoria_id=3`);
        const eventos = res.data.eventos;

        const formatted = eventos.map((e: any) =>
          createData(
            e.id,
            e.titulo,
            e.descripcion ? e.descripcion.slice(0, 20) + (e.descripcion.length > 20 ? '...' : '') : 'Sin descripción',
            new Date(e.fecha_inicio).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }),
            e.capacidad || 0,
            e.departamento || 'N/D',
            e.ubicacion || 'N/D',
            e.categoria_id || 'N/D', // asegúrate de traer este campo
            e.estado_id || 'N/D'
          )
        );

        setRows(formatted);
      } catch (err) {
        console.error('Error al obtener eventos:', err);
      }
    };

    fetchEventos();
  }, []);

  return (
    <Paper sx={{ width: '100%', }}>
      {showModal && (
            <EdicionEventos evento={selectedEvent} onClose={() => setShowModal(false)} />
          )}
      {isOpen && (
        <CrearEvento/>
      )}
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
                    {columns.map((column) => {
                      // Si la columna es de tipo "actions", renderiza el botón
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleEditar(row)}
                            >
                              Editar
                            </Button>
                          </TableCell>
                        );
                      }

                      // Acceso seguro a las propiedades del tipo Data
                      const value = row[column.id as keyof Data];

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Button
        onClick={toggleForm}
        sx={{
          position: 'fixed',
          bottom: 20, // Distancia desde la parte inferior
          right: 20, // Distancia desde la parte derecha
          backgroundColor: '#3f51b5', // Color de fondo
          color: 'white',
          borderRadius: '50%',
          boxShadow: 3,
          zIndex: 1000, // Asegurarse de que el botón esté encima de otros elementos
          '&:hover': {
            backgroundColor: '#303f9f',
          },
        }}
        variant="contained"
      >
        <AddIcon />
      </Button>
      

    </Paper>
  );
}

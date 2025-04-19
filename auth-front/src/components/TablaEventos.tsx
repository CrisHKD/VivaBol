import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  //id: 'name' | 'code' | 'population' | 'size' | 'density';
  id: 'title' | 'description' | 'date' | 'capacity' | 'department' | 'location' | 'type' | 'status';
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
];

interface Data {
    title: string,
    description: string,
    date: string,
    capacity: number,
    department: string,
    location: string,
    type: string,
    status: string,
}

function createData(
  title: string,
  description: string,
  date: string,
  capacity: number,
  department: string,
  location: string,
  type: string,
  status: string,
): Data {
  return { title, description, date, capacity, department, location, type, status };
}

const rows = [
    createData('Evento 1', 'Descripción del evento 1', '2025-06-01', 100, 'La Paz', 'Bolivia', 'Cultural', 'Activo'),
    createData('Evento 2', 'Descripción del evento 2', '2025-07-15', 250, 'Cochabamba', 'Bolivia', 'Académico', 'Inactivo'),
    createData('Evento 3', 'Descripción del evento 3', '2025-08-20', 150, 'Santa Cruz', 'Bolivia', 'Gastronómico', 'Activo'),
    createData('Evento 4', 'Descripción del evento 4', '2025-09-05', 200, 'Oruro', 'Bolivia', 'Deportivo', 'Activo'),
    createData('Evento 5', 'Descripción del evento 5', '2025-10-10', 300, 'Tarija', 'Bolivia', 'Musical', 'Inactivo'),
    createData('Evento 1', 'Descripción del evento 1', '2025-06-01', 100, 'La Paz', 'Bolivia', 'Cultural', 'Activo'),
    createData('Evento 2', 'Descripción del evento 2', '2025-07-15', 250, 'Cochabamba', 'Bolivia', 'Académico', 'Inactivo'),
    createData('Evento 3', 'Descripción del evento 3', '2025-08-20', 150, 'Santa Cruz', 'Bolivia', 'Gastronómico', 'Activo'),
    createData('Evento 4', 'Descripción del evento 4', '2025-09-05', 200, 'Oruro', 'Bolivia', 'Deportivo', 'Activo'),
    createData('Evento 5', 'Descripción del evento 5', '2025-10-10', 300, 'Tarija', 'Bolivia', 'Musical', 'Inactivo'),
    createData('Evento 1', 'Descripción del evento 1', '2025-06-01', 100, 'La Paz', 'Bolivia', 'Cultural', 'Activo'),
    createData('Evento 2', 'Descripción del evento 2', '2025-07-15', 250, 'Cochabamba', 'Bolivia', 'Académico', 'Inactivo'),
    createData('Evento 3', 'Descripción del evento 3', '2025-08-20', 150, 'Santa Cruz', 'Bolivia', 'Gastronómico', 'Activo'),
    createData('Evento 4', 'Descripción del evento 4', '2025-09-05', 200, 'Oruro', 'Bolivia', 'Deportivo', 'Activo'),
    createData('Evento 5', 'Descripción del evento 5', '2025-10-10', 300, 'Tarija', 'Bolivia', 'Musical', 'Inactivo'),
    createData('Evento 1', 'Descripción del evento 1', '2025-06-01', 100, 'La Paz', 'Bolivia', 'Cultural', 'Activo'),
    createData('Evento 2', 'Descripción del evento 2', '2025-07-15', 250, 'Cochabamba', 'Bolivia', 'Académico', 'Inactivo'),
    createData('Evento 3', 'Descripción del evento 3', '2025-08-20', 150, 'Santa Cruz', 'Bolivia', 'Gastronómico', 'Activo'),
    createData('Evento 4', 'Descripción del evento 4', '2025-09-05', 200, 'Oruro', 'Bolivia', 'Deportivo', 'Activo'),
    createData('Evento 5', 'Descripción del evento 5', '2025-10-10', 300, 'Tarija', 'Bolivia', 'Musical', 'Inactivo'),
    createData('Evento 1', 'Descripción del evento 1', '2025-06-01', 100, 'La Paz', 'Bolivia', 'Cultural', 'Activo'),
    createData('Evento 2', 'Descripción del evento 2', '2025-07-15', 250, 'Cochabamba', 'Bolivia', 'Académico', 'Inactivo'),
    createData('Evento 3', 'Descripción del evento 3', '2025-08-20', 150, 'Santa Cruz', 'Bolivia', 'Gastronómico', 'Activo'),
    createData('Evento 4', 'Descripción del evento 4', '2025-09-05', 200, 'Oruro', 'Bolivia', 'Deportivo', 'Activo'),
    createData('Evento 5', 'Descripción del evento 5', '2025-10-10', 300, 'Tarija', 'Bolivia', 'Musical', 'Inactivo'),
    createData('Evento 1', 'Descripción del evento 1', '2025-06-01', 100, 'La Paz', 'Bolivia', 'Cultural', 'Activo'),
    createData('Evento 2', 'Descripción del evento 2', '2025-07-15', 250, 'Cochabamba', 'Bolivia', 'Académico', 'Inactivo'),
    createData('Evento 3', 'Descripción del evento 3', '2025-08-20', 150, 'Santa Cruz', 'Bolivia', 'Gastronómico', 'Activo'),
    createData('Evento 4', 'Descripción del evento 4', '2025-09-05', 200, 'Oruro', 'Bolivia', 'Deportivo', 'Activo'),
    createData('Evento 5', 'Descripción del evento 5', '2025-10-10', 300, 'Tarija', 'Bolivia', 'Musical', 'Inactivo'),
];

export default function TablaEventos() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%',}}>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.description}>
                    {columns.map((column) => {
                      const value = row[column.id];
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
    </Paper>
  );
}

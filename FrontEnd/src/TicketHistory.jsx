import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    width: '100%',
  }

}));

const columns = [
  { field: 'pessoa', headerName: 'Submissor', width: 100 },
  { field: 'sala', headerName: 'Sala', width: 70 },
  { field: 'motivo', headerName: 'Motivo', width: 300 },
  { field: 'descricao', headerName: 'Descrição', width: 300 },
  { field: 'prioridade', headerName: 'Prioridade', width: 120, editable: true },
  { field: 'estado', headerName: 'Estado', width: 200, editable: true },
  { field: 'diretor', headerName: 'Diretor', width: 90 },
  { field: 'tecnico_responsavel', headerName: 'Técnico', width: 90 }
];

function TicketHistory() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("token")
  const decoded = jwt_decode(token)

  useEffect(() => {
    async function fetchAPI() {
      await axios.get("/ticket")
        .then((res) => setRows(res.data))
    }

    fetchAPI();
  }, []);

  return (
    <div className={classes.root}>
      <DataGrid
        rows={rows.filter(row => row.pessoa === decoded.id)}
        columns={columns}
        pageSize={99}
        disableColumnMenu
      />
    </div>
  );
}

export default TicketHistory;

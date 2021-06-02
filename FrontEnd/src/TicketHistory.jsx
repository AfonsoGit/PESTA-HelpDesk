import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    width: '70%'
  },

}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70, editable: false },
  { field: 'pessoa', headerName: 'Submissor', width: 150, editable: false },
  { field: 'sala', headerName: 'Sala', width: 130, editable: false },
  { field: 'motivo', headerName: 'Motivo', width: 130, editable: false },
  { field: 'descricao', headerName: 'Descrição', width: 300, editable: false },
  { field: 'prioridade', headerName: 'Prioridade', width: 100, editable: true},
  { field: 'estado', headerName: 'Estado', width: 130, editable: true}
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
        rows={rows.filter(row => row.pessoa === decoded.id)} /* DEF - Username */
        columns={columns}
        pageSize={99}
      />
    </div>
  );
}

export default TicketHistory;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';

//CSS
const useStyles = makeStyles((theme) => ({

  consulta: {
      height: 370,
      width: '70%',
      marginTop: theme.spacing(1)
  }

}));

//
const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'motivo', headerName: 'Motivo', width: 180 },
  { field: 'prioridade', headerName: 'Prioridade', width: 150},
  { field: 'estado', headerName:'Estado', width: 150 },
  { field: 'descricao', headerName: 'Descrição', width: 250 },  
];

//Print da informação do servidor apenas como uma lista
function Customers() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchAPI() {
      await axios.get("/users")
        .then((res) => setRows(res.data))
    }

    fetchAPI();
  }, []);

  return (
    console.log(rows),
    <div className={classes.consulta}> 
      <DataGrid rows={rows} columns={columns} pageSize={5}  />
    </div>
  );
}

export default Customers;
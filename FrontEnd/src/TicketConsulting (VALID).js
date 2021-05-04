import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import {makeStyles} from '@material-ui/core/styles';

//Mostra a tabela com dados do servidor. ASD
const useStyles = makeStyles((theme) => ({

    consulta: {
        height: 370,
        width: '70%',
        marginTop: theme.spacing(1)
    }

}));



const columns = [
    { field: 'motivo', headerName: 'Motivo', width: 180 },
    { field: 'sala', headerName: 'Sala', width: 150},
    { field: 'estado', headerName:'Estado', width: 150 },
    { field: 'descricao', headerName: 'Descrição', width: 250 },  
];


//Função main da página
function TicketConsulting () {
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
        <div className={classes.consulta}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    )
}

export default TicketConsulting;
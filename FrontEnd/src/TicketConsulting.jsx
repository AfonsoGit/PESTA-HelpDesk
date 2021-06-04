import React, { useState, useEffect, useCallback } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    width: '100%'
  },

}));

const columns = [
  { field: 'id', headerName: 'ID', width: 70, editable: false },
  { field: 'submissor', headerName: 'Submissor', width: 130, editable: false },
  { field: 'sala', headerName: 'Sala', width: 100, editable: false },
  { field: 'motivo', headerName: 'Motivo', width: 200, editable: false },
  { field: 'descricao', headerName: 'Descrição', width: 300, editable: false },
  { field: 'estado', headerName: 'Estado', width: 300, editable: false },
  { field: 'prioridade', headerName: 'Prioridade', width: 130, editable: true}
];

function TicketConsulting() {
  const classes = useStyles()
  const [rows, setRows] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      await axios.get("/ticket")
        .then((res) => setRows(res.data))
    }

    fetchAPI();
  }, []);

  const handleEditCellChangeCommitted = useCallback(
    ({ id, field, props }) => {
      const data = [
        id,
        field,
        props.value
      ]
      axios.put('/ticket/editing', data)
    },
    [],
  );

  return (
      <div className={classes.root}>
        <DataGrid
          rows={rows}
          columns={columns}
          onEditCellChangeCommitted={handleEditCellChangeCommitted}
          pageSize={99}
          disableColumnMenu
        />
      </div>
  );
}

export default TicketConsulting;

import React, { useState, useEffect, useCallback } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { makeStyles } from "@material-ui/core/styles"
import axios from 'axios'
import jwt_decode from 'jwt-decode'


const useStyles = makeStyles((theme) => ({
    root: {
        height: 400,
        width: '100%'
    },

}));


const columns = [
    { field: 'pessoa', headerName: 'Req.', width: 100 },
    { field: 'sala', headerName: 'Sala', width: 70 },
    { field: 'motivo', headerName: 'Motivo', width: 300 },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    { field: 'prioridade', headerName: 'Prioridade', width: 120, editable: true },
    { field: 'estado', headerName: 'Estado', width: 200, editable: true },
    { field: 'diretor', headerName: 'Diretor', width: 90 },
    { field: 'tecnico_responsavel', headerName: 'Técnico', width: 90 }
];


function TicketLab() {
    const classes = useStyles()
    const [rows, setRows] = useState([])
    const token = localStorage.getItem("token")
    const decoded = jwt_decode(token)

    useEffect(() => {
        async function labSorting() {
            const abc = await axios.get("/ticket/lab", {params:decoded.id})
            setRows(abc.data)
        }

        labSorting();
    }, );

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
    )
}

export default TicketLab

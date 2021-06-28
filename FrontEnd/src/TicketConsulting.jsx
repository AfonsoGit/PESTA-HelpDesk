import React, { useState, useEffect, useCallback } from 'react';
import { XGrid } from '@material-ui/x-grid';
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { useFormik } from 'formik';

//Função de personalização dos componentes
const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    width: '100%',
  },

  overlay: {
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, .7)',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10
  },

  modalMain: {
    padding: theme.spacing(4),
  },

  closeButton: {
    background: 'transparent',
    padding: '10px',
    cursor: 'pointer',
    color: '#ffffff',
    fontSize: '36px',
    border: 'none'
  },

  modalHeader: {
    background: '#ff0000',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between'
  },

  modal: {
    position: 'fixed',
    zIndex: 20,
    background: '#ffffff',
    width: '500px',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)'
  },

  tableInfoButton: {
    cursor: 'pointer',
  },

  error: {
    fontSize: "11px",
    color: "#ff0000",
  },

}));

//Função de validação
const validate = values => {
  const error = {}

  if (!values.prioridade) {
    error.prioridade = 'Obrigatório'
  }

  if (!values.estado) {
    error.estado = 'Obrigatório'
  }

  return error
}

//Função principal
function TicketConsulting() {
  const classes = useStyles()
  const [rows, setRows] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [param, setParam] = useState([])

  useEffect(() => {
    async function fetchAPI() {
      await axios.get("/ticket")
        .then((res) => setRows(res.data))
    }

    fetchAPI();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: param.id,
      pessoa: param.pessoa,
      sala: param.id_instalacao,
      motivo: param.motivo,
      descricao: param.descricao,
      estado: param.estado,
      prioridade: param.prioridade,
      data: param.data,
      dataEdicao: new Date().toLocaleDateString()
    },
    validate,
    onSubmit: values => {
      /* axios.post('/ticket', values)
      alert('Submetido com sucesso') */
      //setShowModal(false)
      alert(JSON.stringify(values, null, 2))
    },
  })

  const columns = [
    { field: 'pessoa', headerName: 'Req.', width: 70 },
    { field: 'sala', headerName: 'Sala', width: 70 },
    { field: 'motivo', headerName: 'Motivo', width: 300 },
    { field: 'descricao', headerName: 'Descrição', width: 300 },
    { field: 'prioridade', headerName: 'Prioridade', width: 120, editable: true },
    { field: 'estado', headerName: 'Estado', width: 200, editable: true },
    { field: 'diretor', headerName: 'Diretor', width: 90 },
    { field: 'tecnico_responsavel', headerName: 'Técnico', width: 90 },
    { field: 'data', headername: 'Data de submissão' },
    {
      field: 'info',
      headerName: 'Info',
      width: 110,
      renderCell: (params) => (
        <InfoIcon
          className={classes.tableInfoButton}
          onClick={() => {
            setShowModal(true)
            setParam(params.row)
          }}
        >
          Info
        </InfoIcon>
      ),
    },
  ];
  /* Estrutura de um ticket
    data: "21/06/2021"
    descricao: "Gnjap"
    diretor: "jes"
    estado: "Processando o pedido"
    id: 24
    id_instalacao: "F314"
    motivo: "Componente avariado"
    pessoa: "jes"
    prioridade: "Não definida"
    sala: "F314"
    tecnico_responsavel: "hvms" */

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

  const closeModal = () => {
    setShowModal(false);
  }


  return (
    <Grid className={classes.root}>
      <XGrid
        rows={rows}
        columns={columns}
        onEditCellChangeCommitted={handleEditCellChangeCommitted}
        pageSize={99}
        disableColumnMenu
      />
      {showModal ?
        <>
          <div className={classes.overlay} />
          <div className={classes.modal}>
            <header className={classes.modalHeader}>
              <h2>Ticket #{param.id}</h2>
              <CloseIcon onClick={closeModal} className={classes.closeButton} />
            </header>

            <form onSubmit={formik.handleSubmit} autoComplete='off' >
              <Grid container direction="column" className={classes.modalMain}>

                <TextField
                  size="small"
                  variant="outlined"
                  value={param.sala}
                  //disabled
                  label="Sala"
                />

                <br />

                <TextField
                  size="small"
                  variant="outlined"
                  value={param.motivo}
                  //disabled
                  label="Motivo"
                />

                <br />

                <TextField
                  size="small"
                  variant="outlined"
                  value={param.descricao}
                  multiline="true"
                  rows={5}
                  //disabled
                  label="Descrição"
                />

                <br />

                <TextField
                  name="prioridade"
                  size="small"
                  variant="outlined"
                  label="Prioridade"
                  onChange={formik.handleChange}
                  value={formik.values.prioridade}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.prioridade && formik.errors.prioridade ?
                  <div className={classes.error}>{formik.errors.prioridade}</div>
                  : null}

                <br />

                <TextField
                  name="estado"
                  size="small"
                  variant="outlined"
                  label="Estado"
                  onChange={formik.handleChange}
                  value={formik.values.estado}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.estado && formik.errors.estado ?
                  <div className={classes.error}>{formik.errors.estado}</div>
                  : null}

                <br />

                <TextField
                  size="small"
                  variant="outlined"
                  value={param.diretor}
                  //disabled
                  label="Diretor do laboratório"
                />

                <br />

                <TextField
                  size="small"
                  variant="outlined"
                  value={param.tecnico_responsavel}
                  //disabled
                  label="Técnico Responsável"
                />

                <br />

                <Button
                  variant="contained"
                  type="submit"
                >
                  Update
                </Button>

              </Grid>
            </form>
          </div>
        </>
        : null}
    </Grid>
  );
}

export default TicketConsulting;

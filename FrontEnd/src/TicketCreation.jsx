//Página onde decorre a criação de tickets. ASD
import React from 'react';
import { Paper, Grid, TextField, Button, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import CustomSelect from './CustomSelect';

const useStyles = makeStyles((theme) => ({

    //Ticket geral
    ticket: {
        padding: theme.spacing(5),
        marginTop: theme.spacing(2),
        width: '100%',
        textAlign: 'center',
        background: "#e6e6e6",
    },

    //Label da caixa do motivo
    label: {
        marginTop: theme.spacing(2),
    },

    //Texto de erros de introdução de dados
    error: {
        fontSize: "11px",
        color: "#ff0000",
    },

    //Caixa de texto para informações adicionais
    descricao: {
        width: 400,
    },

}));

//Regras para validação
const validate = values => {

    const error = {}

    if (!values.sala) {
        error.sala = 'Obrigatório'
    } else if (values.sala.length >= 5) {
        error.sala = 'Sala Inexistente'
    }

    if (!values.motivo) {
        error.motivo = 'Obrigatório'
    }

    return error
}


//Função main da página
function TicketCreation() {
    const classes = useStyles();
    const nome = jwt_decode(localStorage.getItem("token")).id

    const options = [
        { value: 'Componente avariado', label: 'Componente avariado' },                            //value => o que vai estar dentro do "values"
        { value: 'Aparelho de laboratório', label: 'Aparelho de laboratório' },                    //label => o que vai ser mostrado na combobox
        { value: 'Pedido de Licenças', label: 'Pedido de Licenças' },
        { value: 'Computador', label: 'Computador' },
        { value: 'Outros', label: 'Outros' },
    ]

    const formik = useFormik({
        initialValues: {
            id: null,
            pessoa: nome,
            sala: '',
            motivo: '',
            descricao: '',
            estado: 'Processando o pedido',
            prioridade: 'Não definida',
            data: new Date().toLocaleDateString()
        },
        validate,
        onSubmit: values => {
            axios.post('/ticket', values)
            alert('Submetido com sucesso')
        },
    })

    return (
        <form onSubmit={formik.handleSubmit} autoComplete="off">
            <Grid container item xs={10}>
                <Paper className={classes.ticket}>
                    <InputLabel className={classes.label}><em>Sala</em></InputLabel>
                    <TextField name="sala" placeholder="Sala" variant="outlined" size="small"
                        onChange={formik.handleChange} value={formik.values.sala} onBlur={formik.handleBlur} />
                    {formik.touched.sala && formik.errors.sala ? <div className={classes.error}>{formik.errors.sala}</div> : null}

                    <br />

                    <InputLabel className={classes.label}> <em>Escolha o motivo</em> </InputLabel>
                    <CustomSelect
                        onChange={value => formik.setFieldValue('motivo', value.value)}
                        value={formik.values.motivo}
                        options={options}
                    />
                    {formik.errors.motivo ? <div className={classes.error}>{formik.errors.motivo}</div> : null}

                    <br />

                    <InputLabel className={classes.label}><em>Informações adicionais</em></InputLabel>
                    <TextField className={classes.descricao} name="descricao" variant="outlined" size="small" multiline="true" rows={5}
                        onChange={formik.handleChange} value={formik.values.descricao} onBlur={formik.handleBlur} />
                    {formik.touched.descricao && formik.errors.descricao ? <div className={classes.error}>{formik.errors.descricao}</div> : null}

                    <br /> <br />

                    <Button variant="contained" color="primary" type="submit">Submeter</Button>
                </Paper>
            </Grid>
        </form>
    );
}

export default TicketCreation;
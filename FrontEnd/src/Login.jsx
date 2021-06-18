import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { Redirect } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';

//CSS
const useStyles = makeStyles((theme) => ({
    header: {
        flexGrow: 1,
        background: "#144f84",
    },

    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        background: "#144f84",
        color: "#ffffff",
        fontSize: "45px",
        width: "100%",
    },

    error: {
        fontSize: "11px",
        color: "#ff0000",
    },

}));

const validate = values => {
    const errors = {}

    if (!values.username) {
        errors.username = 'Required'
    }
    if (values.username.length >= 50) {
        errors.username = 'Demasiados carateres'
    }

    if (!values.password) {
        errors.password = 'Required'
    }

    return errors
}

function Login() {
    const classes = useStyles();
    const [dataValidated, setDataValidated] = useState(''); //Credenciais

    function handleDataSubmit(values) {
        axios.post("/login", values)
            .then((res) => {
                if (!res.data.result[0]) {
                    alert("Dados Inválidos!!")
                } else {
                    localStorage.setItem("token", res.data.token)
                    setDataValidated(res.data.result[0])
                }
            })
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: (values) => handleDataSubmit(values)
    })

    //Validar se o utilizador está validado (loginStatus) e se possui um token (token)
    if (localStorage.getItem("token")) {
        //Dependendo do utilizador, pode haver 
        if (dataValidated.username === 'fdp') return <Redirect to="/diretor" />
        if (dataValidated.username === 'jes' || dataValidated.username === 'vmcc') return <Redirect to="/tecnico" />
        if (dataValidated.username === 'vrc') return <Redirect to="/docente" />
    }

    return (
        <div>
            {localStorage.removeItem("token")}
            <form onSubmit={formik.handleSubmit}>
                <Grid container item xs={12} direction="column" alignItems="center">
                    <Grid container item xs={10} className={classes.header}>
                        {/* Meter imagem do banner do DEE */}
                        <br />
                        <Paper className={classes.paper}>Helpdesk DEE</Paper>
                    </Grid>

                    <Grid container item xs={2} direction="column">
                        <br /> <br /> <br />
                        <TextField
                            className={classes.data}
                            variant="outlined"
                            name="username"
                            id="username"
                            label="Username (Sigla)"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            noValidate
                            autoComplete="off"
                        />
                        {formik.touched.username && formik.errors.username ? <div className={classes.error}>{formik.errors.username}</div> : null}
                        <br />
                        <TextField
                            className={classes.data}
                            variant="outlined"
                            type="password"
                            name="password"
                            label="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            noValidate
                            autoComplete="off"
                        />
                        {formik.touched.password && formik.errors.password ? <div className={classes.error}>{formik.errors.password}</div> : null}
                        <br />
                    </Grid>

                    <Grid container xs={2} justify="flex-end">
                        <Button
                            className={classes.botao}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Entrar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}
export default Login;
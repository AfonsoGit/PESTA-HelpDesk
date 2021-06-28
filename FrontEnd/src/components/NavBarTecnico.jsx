import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    botoes: {
        background: "#144f84",
        color: "#ffffff",
        marginRight: "0.4cm",
        marginBottom: "2cm",
    }
}));

const NavBar = () => {
    const classes = useStyles();

    return (
        <Grid container item xs={10} direction="row" justify="center">
            <Link to='/tecnico'>
                <Button variant="contained" className={classes.botoes} >Home</Button>
            </Link>
            <Link to="/tecnico/criar">
                <Button variant="contained" className={classes.botoes} >Criar ticket</Button>
            </Link>
            <Link to='/tecnico/consultar'>
                <Button variant="contained" className={classes.botoes} >Todos os tickets</Button>
            </Link>
            <Link to='/tecnico/sortByLabs'>
                <Button variant="contained" className={classes.botoes} >Tickets do laboratório</Button>
            </Link>
            <Link to='/tecnico/history'>
                <Button variant="contained" className={classes.botaoFinal} >Histórico de tickets</Button>
            </Link>
        </Grid>
    )
}

export default NavBar;
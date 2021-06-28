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
    },

}));


const NavBar = () => {
    const classes = useStyles();

    return (
        <Grid container item xs={10} direction="row" justify="center">
            <Link to='/diretor'>
                <Button variant="contained" className={classes.botoes} >Home</Button>
            </Link>
            <Link to='/diretor/criar'>
                <Button variant="contained" className={classes.botoes} >Criar ticket</Button>
            </Link>
            <Link to='/diretor/consultar'>
                <Button variant="contained" className={classes.botoes} >Consultar tickets submetidos</Button>
            </Link>
        </Grid>
    )
}

export default NavBar;
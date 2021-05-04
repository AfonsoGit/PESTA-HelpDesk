import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    botoes: {
        background: "#144f84",
        color: "#ffffff",
        marginTop: theme.spacing(1),
    }
}));

const NavBar = () => {
    const classes = useStyles();

    return(
        <Grid container item xs={3}>
        <nav>
            <Link to='/'>
                <Button variant="contained" className={classes.botoes} >Home</Button>
            </Link>
            <br /> <br />
            <Link to='/criar'>
                <Button variant="contained" className={classes.botoes} >Criar ticket</Button>
            </Link>
            <br /> <br />
            <Link to='/consultar'>
                <Button variant="contained" className={classes.botoes} >Editar ticket</Button>
            </Link>
        </nav>
        </Grid>
    )
}

export default NavBar;
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //Biblioteca para fazer routing entre paginas
import TicketConsulting from './TicketConsulting'; //Página para ver estado dos tickets
import TicketCreation from './components/TicketCreation'; //Página para criar tickets
import Nav from './NavBarTecnico'; //Barra de navegação


//Página que vai ser mostrada para todas as pessoas. ASD
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


  }));

//Função main da página
const PaginaTecnico = () => {
    const classes = useStyles();

    return(
      <div >
        <Grid container item xs={12} justify="center">
          <Grid container item xs={10} className={classes.header} >
            {/* Meter imagem do banner do DEE */}
            <br />
            <Paper className={classes.paper}>Helpdesk DEE</Paper>
          </Grid>
          <Grid container item xs={10}>
            <Router>
              <Nav />
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/criar" exact component={TicketCreation} />
                  <Route path="/consultar" exact component={TicketConsulting} />
                </Switch>
            </Router>
            </Grid>
        </Grid>
      </div>
    );
}

const Home = () => (
  <div>
    Bem vindo, técnico do DEE
  </div>
);

export default PaginaTecnico;
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'; //Biblioteca para fazer routing entre paginas
//import jwt_decode from 'jwt-decode';
import TicketConsulting from '../TicketConsulting'; //Página para ver estado dos tickets
import TicketCreation from '../TicketCreation'; //Página para criar tickets
import Nav from './NavBarDiretor'; //Barra de navegação

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

  botoes: {
    background: "#144f84",
    color: "#ffffff",
    marginRight: "0.4cm",
    marginBottom: "2cm",
  },

}));

//Função main da página
const PaginaDiretor = () => {
  const classes = useStyles()
  const [isLogOut, setIsLogOut] = useState(false)

  function handleClick() {
    localStorage.removeItem("token");
    setIsLogOut(true);
  }

  if (isLogOut) {
    return <Redirect to="/" />
  }

  //const token = localStorage.getItem("token")
  //const decoded = jwt_decode(token).id

  return (
    <div>
      <Grid container item xs={12} justify="center">
        <Grid container item xs={11} className={classes.header} justify="flex-end">
          {/* Meter imagem do banner do DEE */}
          <br />
          <Paper className={classes.paper}>Helpdesk DEE</Paper>
        </Grid>
        <Grid container item xs={12} justify="center">
          <Router>
            <Nav />
            <Button className={classes.botoes} variant="contained" onClick={handleClick}>LogOut</Button>
            <Switch>
              <Grid container item xs={11} justify="center">
                <Route path="/diretor" exact />
                <Route path="/diretor/criar" exact component={TicketCreation} />
                <Route path="/diretor/consultar" exact component={TicketConsulting} />
              </Grid>
            </Switch>
          </Router>
        </Grid>
      </Grid>
    </div>
  );
}



export default PaginaDiretor;
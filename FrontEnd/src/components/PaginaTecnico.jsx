import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Button } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom' //Biblioteca para fazer routing entre paginas
//import jwt_decode from 'jwt-decode'
import TicketHistory from '../TicketHistory'
import TicketConsulting from '../TicketConsulting' //Página para ver estado dos tickets
import TicketCreation from '../TicketCreation' //Página para criar tickets
import TicketLab from '../TicketLab' //Página para 
import Nav from './NavBarTecnico' //Barra de navegação


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

  userGrid: {
    background: "#e6e6e6",
    fontSize: "14pt",
  },

  botoes: {
    background: "#144f84",
    color: "#ffffff",
    marginBottom: "0.5cm",
    marginTop: "0.5cm",
  },

}));

//Função main da página
const PaginaTecnico = () => {
  const classes = useStyles()
  const [isLogOut, setIsLogOut] = useState(false)


  function handleClick() {
    localStorage.removeItem("token");
    setIsLogOut(true);
  }

  if (isLogOut && !localStorage.getItem("token")) {
    return <Redirect to="/" />
  }

  //const token = localStorage.getItem("token")
  //const decoded = jwt_decode(token).id


  return (
    <div >
      <Grid container item xs={12} justify="center" alignItems="center">
        <Grid container item xs={11} className={classes.header} >
          {/* Meter imagem do banner do DEE */}
          <br />
          <Paper className={classes.paper}>Helpdesk DEE</Paper>
        </Grid>
        <Grid container item xs={12} justify="center">
            <Router>
              <Nav />
              <Button className={classes.botoes} variant="contained" onClick={handleClick}>LogOut</Button>
              <Switch>
                <Route path="/tecnico" exact />
                <Route path="/tecnico/criar" exact component={TicketCreation} />
                <Route path="/tecnico/consultar" exact component={TicketConsulting} />
                <Route path="/tecnico/sortByLabs" exact component={TicketLab} />
                <Route path="/tecnico/history" exact component={TicketHistory} />
              </Switch>
            </Router>
        </Grid>
      </Grid>
    </div>
  );
}


export default PaginaTecnico;
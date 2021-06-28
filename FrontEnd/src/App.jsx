import React from 'react';
import PaginaDiretor from './components/PaginaDiretor';
import PaginaTecnico from './components/PaginaTecnico';
import PaginaDocente from './components/PaginaDocente';
import Login from './Login';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

//Função main
function App() {
  return (
    <div>
      <Router>
        <Switch>

          <Route path="/login" >
            <Login />
          </Route>

          {/* Route do diretório "Home" para "login" */}
          <Route exact path="/" >
            <Redirect to="/login" />
          </Route>

          {/* Route do diretor */}
          <Route exact path="/diretor">
            <PaginaDiretor />
          </Route>

          {/* Route do diretor */}
          <Route exact path="/tecnico">
            <PaginaTecnico />
          </Route>
          {/* Route do diretor */}
          <Route exact path="/docente">
            <PaginaDocente />
          </Route>

        </Switch>
      </Router>
    </div>

  );
}

export default App;
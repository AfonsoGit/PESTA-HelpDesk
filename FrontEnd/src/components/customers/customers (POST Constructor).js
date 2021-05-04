import React, { Component } from 'react';

class Customers extends Component{

  //
  componentDidMount() {
    //Simples Pedido POST (Sem constructor)
    const id = 5;
    const name = 'G';
    const motivo = 'H';
    const descricao = 'I';
    const data = {id, name, motivo, descricao};
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }
    fetch('/users', options)
  }

  
  
  render() {
    
    return (
      <div>
        <h2>Customers</h2>  
      </div>
    
    );
  } 
}

export default Customers;
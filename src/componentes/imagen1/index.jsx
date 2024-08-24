import React, { Component } from "react";
import './contenido.css'
class  Contenido extends Component {

  render() {
    return (
      <> 
        <div className="imagen1-contenido">

        </div>
        <div className="imagen2-contenido">
          <h1 className="titulo-imagen2"> Viaja en calma, vive en grande</h1>
          <img src="./avianca-bird.png" alt="logo-avianca" width={200} className="logo-avianca"></img>
          <p> Reserva y vuela entre agosto y noviembre de 2024 </p>

          <p> Por trayecto desde</p> 
          <h1 className="precio"> COP 74.600</h1> <button className="button-compra"> Compra ya</button>
        </div>
        
      </>
 


      
         );
  }
}

export default Contenido;



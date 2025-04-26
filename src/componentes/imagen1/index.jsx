import React, { Component } from "react";
import './contenido.css';
import home from './home.jpg';

class Contenido extends Component {
  render() {
    return (
      <> 
        <div className='contenido'>
          <div 
            className="imagen1-contenido"
            style={{ backgroundImage: `url(${home})` }}
          >
            {/* Contenido opcional dentro de la imagen */}
          </div>
          
          <div className="imagen2-contenido">
            <img  className="avi-logo" src='./avi-logo.png' width="100" height="100" /> 
            <h1 className="titulo1">¡Más de 80 destinos</h1>
            <h1 className="titulo-sub">esperan por ti!</h1>
            <p className='destinos'>Medellín, Cali, Fort Lauderdale, Sao Paulo, Buenos Aires y</p>
            <p className='cont-dest'>muchos lugares mas por recorrer</p>
            <button className="button-compraya">Compra ya</button>
          </div>
        </div>
      </>
    );
  }
}

export default Contenido;


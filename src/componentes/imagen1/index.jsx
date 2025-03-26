import React, { Component } from "react";
import './contenido.css';
import viajera from './mujer-viajera.png';

class Contenido extends Component {
  render() {
    return (
      <> 
        <div className='contenido'>
          <div 
            className="imagen1-contenido"
            style={{ backgroundImage: `url(${viajera})` }}
          >
            {/* Contenido opcional dentro de la imagen */}
          </div>
          
          <div className="imagen2-contenido">
            <h1 className="titulo1">Viaja en calma, vive en grande</h1>
            <p>Reserva y vuela entre agosto y noviembre de 2024</p>
            <p>Por trayecto desde</p>
            <h1 className="titulo2">COP 124.300</h1>
            <button className="button-compraya">COMPRA YA</button>
          </div>
        </div>
      </>
    );
  }
}

export default Contenido;


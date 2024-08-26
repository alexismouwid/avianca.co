import React, { Component } from "react";
import './contenido.css'
class  Contenido extends Component {

  render() {
    return (
      <> 
        <content className='contenido'> 

        <div className="imagen1-contenido">
          <h1 className="espacio"> contenido de prueba</h1>
         
        </div>
          <div className="imagen2-contenido">

            <h1 className="titulo1"> Viaja en calma, vive en grande</h1>
            <p> Reserva y vuela entre agosto y noviembre de 2024 </p>
            <p> Por trayecto desde</p>
            <h1 className="titulo2"> COP 124.300 </h1>
            <button className="button-compraya"></button>

          </div>
          



        </content>

        
              
      </>
 


      
         );
  }
}

export default Contenido;



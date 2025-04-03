import React, { Component } from "react";
import './content2.css';
import popayan from './popayan.jpg';
import ibague from './ibague.jpg';
import cali from './cali.jpg';

class Contenido2 extends Component {
  render() {
    return (
      <> 
        <div className='contenido2'>
          <div 
            className="imagen1-contenido2"
            style={{ backgroundImage: `url(${popayan})` }}
          >
          </div>
          
          <div className="imagen2-contenido2"
            style={{ backgroundImage: `url(${ibague})` }}
          >

                      </div>
           <div className="imagen3-contenido2"
            style={{ backgroundImage: `url(${cali})` }}
           >

                      </div>

        </div>
      </>
    );
  }
}

export default Contenido2;


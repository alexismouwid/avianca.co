import React from 'react';
import OfertaCard from './OfertaCard';
import './Ofertas.css';

const Ofertas = () => {
  return (<>
<h2 className ="titulo-ofertas"> Ofertas desde <span className="ciudad">Bogotá</span> <span className="flecha">▼</span>
      </h2>

    <section className="ofertas">
      
      <div className="cards">
        <OfertaCard imgSrc="/armenia.jpg" ciudad="Armenia" precio="213.500" />
        <OfertaCard imgSrc="/medellin.jpg" ciudad="Medellín" precio="219.500" />
        <OfertaCard imgSrc="/quibdo.jpg" ciudad="Quibdó" precio="219.900" />
      </div>
    </section></>
  );
};

export default Ofertas;


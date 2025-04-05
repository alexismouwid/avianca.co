import React from 'react';
import './OfertaCard.css';

const OfertaCard = ({  imgSrc, ciudad, precio }) => {
  return (
    <div className="card" style={{ backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center,' }}>

<div className="overlay">
<div className="info">
        <h3>{ciudad}</h3>
        <p>Por trayecto desde <span className="precio">COP {precio}</span></p>
      </div>
</div>
          </div>
  );
};

export default OfertaCard;


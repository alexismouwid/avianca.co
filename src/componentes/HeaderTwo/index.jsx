import React, { useState, useEffect } from "react";
import "./HeaderTwo.css";

const HeaderTwo = ({ vuelos, onMostrarSearch }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const defaultVuelo = {
    origen: "Origen",
    destino: "Destino",
    fechaIda: new Date().toISOString(),
    pasajeros: 1,
    adults: 1,
  };

  const vueloIda =
    vuelos?.ida?.directos?.[0] ||
    vuelos?.ida?.conEscala?.[0] ||
    defaultVuelo;
    
  const vueloRegreso = 
    vuelos?.regreso?.directos?.[0] || 
    vuelos?.regreso?.conEscala?.[0];
    
  const tieneVueloRegreso = !!vueloRegreso;

  const step = 1;
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const formatDate = (dateStr) => {
    if (!dateStr) return "--/--/----";
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const adultos = vueloIda.adults || 1;
console.log(vueloIda.fechaIda)
  return (
    <nav className="headertwo">
      <div className="left-section">
        <img
          src="/nombre-logo.png"
          alt="Avianca"
          className="avianca-logo"
          width="120px"
        />
        
        <div className="route-info">
          <div className="cities">
            {vueloIda.origen} a {vueloIda.destino}
                     </div>
          <div className="route-details">
            <span className="dates">
              <img
                src="./origen.png"
                alt="plane icon"
                className="icon-plane"
                width={20}
              />
              {formatDate(vueloIda.fechaIda || vueloIda.fecha)}
             
               {tieneVueloRegreso && (
    <span>
      <img
        src="./regreso.png"
        alt="plane icon return"
        className="icon-plane"
        width={20}
      />
      {formatDate(vueloRegreso.fechaIda || vueloRegreso.fecha)}
    </span>
  )}           </span>
            <span>
              <img
                className="icon-pasajero"
                src="./inicio.png"
                alt="pasajero"
                width={23}
              />
            </span>
            <span className="passengers">
              {adultos} {adultos === 1 ? "Adulto" : "Adultos"}
            </span>
            <a className="modify-search" onClick={onMostrarSearch} href="#">
              {isMobile ? <img src="./modificar.png" alt="lupa" width={50}/> : 'Modificar busqueda'}
            </a>
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="right-section">
          <div className="step-info">
            Paso {step} de {totalSteps}
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      {!isMobile && (
        <button className="cart">
          <span className="cart-icon">
            <img src="./carro-negro.png" alt="carrito" width={15} />
          </span>
          <span className="cart-amount">COP 0</span>
        </button>
      )}
    </nav>
  );
};

export default HeaderTwo;

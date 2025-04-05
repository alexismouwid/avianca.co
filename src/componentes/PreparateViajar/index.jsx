// src/components/PreparateViajar.jsx
import React from 'react';
import './PreparateViajar.css';

const tarjetas = [
  {
    icon: '/check-in.svg',
    titulo: 'Check-in online',
    descripcion: 'Obtén tu pase de abordar y ahorra tiempo en el aeropuerto.',
  },
  {
    icon: '/centro-de-ayuda.svg',
    titulo: 'Centro de ayuda',
    descripcion: 'Busca y encuentra información útil para resolver tus preguntas.',
  },
  {
    icon: '/requisitos-para-viajar.svg',
    titulo: 'Requisitos para viajar',
    descripcion: 'Infórmate acerca de visas, vacunas y demás documentos.',
  },
];

const PreparateViajar = () => {
  return (
    <section className="preparate-container">
      <h2 className="titulo">Prepárate para viajar</h2>
      <div className="tarjetas">
        {tarjetas.map((item, index) => (
          <div key={index} className="tarjeta">
            <img src={item.icon} alt={item.titulo} className="icono" />
            <div>
              <h3>{item.titulo}</h3>
              <p>{item.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PreparateViajar;


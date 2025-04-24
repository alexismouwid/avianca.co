import React, { useEffect, useState } from 'react';
import './ResultadosVuelos.css';

const ResultadosVuelos = ({ vuelos }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!vuelos) return null;

    const formatHora = (horaStr) => {
        if (!horaStr) return '--:--';
        return horaStr.split(':').slice(0, 2).join(':');
    };

    const formatFecha = (fecha) => {
        if (!fecha) return '--';
        const options = { weekday: 'short', day: 'numeric', month: 'short' };
        return new Date(fecha).toLocaleDateString('es-CO', options);
    };

    const formatPrecio = (precio) => {
        if (!precio) return '--';
        return new Intl.NumberFormat('es-CO', { 
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(precio);
    };

    const renderVuelo = (vuelo, tipo) => {
        return (
            <div key={vuelo._id} className="vuelo-card">
                <div className="vuelo-hora">
                    <span className="hora">{formatHora(vuelo.horaDespegue)}</span>
                    <span className="aeropuerto">{vuelo.origen.substring(0, 3).toUpperCase()}</span>
                </div>
                
                <div className="vuelo-info">
                    <span className="tipo-vuelo">{tipo === 'directo' ? 'Directo' : '1 parada'}</span>  
                    
                    <span className="plane">

                        
                        <img src='./circulo.png' alt="Avión" width="10px" />
                        {isMobile ? '----' : '--------------------------------------'}
                        <img src='./plane.png' alt="Avión" width="20px" />
                        {isMobile ? '----' : '-------------------------------------'}
                        <img src='./circulo.png' alt="Avión" width="10px" />
                    </span>
                    
                    <div className="duracion">{formatHora(vuelo.tiempoVuelo)}</div>
                </div>

                <div className="vuelo-hora-regreso">
                    <span className="hora">{formatHora(vuelo.horaLlegada)}</span>
                    <span className="aeropuerto">{vuelo.destino.substring(0, 3).toUpperCase()}</span>
                </div>
                
                <div className="vuelo-precio">
                    <span className="desde">Desde</span>
                    <span className="costo">
                        <span className="moneda">COP</span>{formatPrecio(vuelo.precioCOP)}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="resultados-container">
            <div className="seccion-vuelos">
                <div className="lista-vuelos">
                    {vuelos.ida.directos.length > 0 ? (
                        vuelos.ida.directos.map(vuelo => renderVuelo(vuelo, 'directo'))
                    ) : (
                        <p className="sin-resultados">No hay vuelos directos disponibles</p>
                    )}
                </div>
                
                <div className="lista-vuelos">
                    {vuelos.ida.conEscala.length > 0 ? (
                        vuelos.ida.conEscala.map(vuelo => renderVuelo(vuelo, 'escala'))
                    ) : null}
                </div>
            </div>

            {vuelos.regreso && (
                <div className="seccion-vuelos">
                    <div className="lista-vuelos">
                        {vuelos.regreso.directos.length > 0 ? (
                            vuelos.regreso.directos.map(vuelo => renderVuelo(vuelo, 'directo'))
                        ) : null}
                    </div>
                    
                    <div className="lista-vuelos">
                        {vuelos.regreso.conEscala.length > 0 ? (
                            vuelos.regreso.conEscala.map(vuelo => renderVuelo(vuelo, 'escala'))
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResultadosVuelos;


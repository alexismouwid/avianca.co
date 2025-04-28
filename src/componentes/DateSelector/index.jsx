import React, { useState, useEffect } from 'react';
import './DateSelector.css';

const DateSelector = ({ vuelos, onSearchResults }) => {
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [dateRange, setDateRange] = useState([]);
    const [filters, setFilters] = useState({
        mejorPrecio: true,
        vuelosDirectos: false
    });
    const [initialLoadDone, setInitialLoadDone] = useState(false);

    const vuelosIda = vuelos?.ida?.directos || [];
    const origen = vuelosIda[0]?.origen || '';
    const destino = vuelosIda[0]?.destino || '';

    const generateRandomPrice = () => {
        return Math.floor(Math.random() * (300000 - 170000 + 1)) + 170000;
    };

    const generateDateRange = (centerDate) => {
        const dates = [];
        const center = centerDate ? new Date(centerDate) : new Date();
        
        for (let i = 3; i > 0; i--) {
            const date = new Date(center);
            date.setDate(center.getDate() - i);
            dates.push({
                date: date.toISOString().split('T')[0],
                price: generateRandomPrice()
            });
        }
        
        dates.push({
            date: center.toISOString().split('T')[0],
            price: generateRandomPrice()
        });
        
        for (let i = 1; i <= 3; i++) {
            const date = new Date(center);
            date.setDate(center.getDate() + i);
            dates.push({
                date: date.toISOString().split('T')[0],
                price: generateRandomPrice()
            });
        }
        
        return dates;
    };

    useEffect(() => {
        if (!initialLoadDone && vuelosIda.length > 0) {
            const initialDate = vuelosIda[0].fechaIda ? vuelosIda[0].fechaIda.split('T')[0] : new Date().toISOString().split('T')[0];
            setDateRange(generateDateRange(initialDate));
            setSelectedDate(initialDate);
            setInitialLoadDone(true);
        }
    }, [vuelosIda, initialLoadDone]);

    const searchFlights = async (fecha) => {
        if (!origen || !destino) return;

        setLoading(true);
        try {
            const response = await fetch('https://back-avianca.vercel.app/vuelos/buscar-vuelos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    origen,
                    destino,
                    fechaIda: fecha,
                    fechaRegreso: null,
                    pasajeros: 1
                }),
            });

            if (!response.ok) throw new Error(`Error en la búsqueda (${response.status})`);

            const newData = await response.json();
            if (onSearchResults) onSearchResults(newData);
            return newData;
        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Hubo un error al buscar vuelos");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const handleDateClick = async (fecha) => {
        const pureFecha = fecha.split('T')[0]; // <<< limpiar la fecha
        if (pureFecha !== selectedDate) {
            setSelectedDate(pureFecha);
            setDateRange(generateDateRange(pureFecha));
            await searchFlights(pureFecha);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "--/--/----";
        const date = new Date(dateStr);

        const optionsDay = { weekday: "short", timeZone: "UTC" };
        const optionsDayNumber = { day: "2-digit", timeZone: "UTC" };
        const optionsMonth = { month: "long", timeZone: "UTC" };

        let dayName = date.toLocaleDateString("es-CO", optionsDay);
        const dayNumber = date.toLocaleDateString("es-CO", optionsDayNumber);
        const monthName = date.toLocaleDateString("es-CO", optionsMonth);

        dayName = capitalize(dayName.substring(0, 3)) + '.';

        return `${dayName} ${dayNumber} ${capitalize(monthName)}.`;
    };

    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price).replace('COP', 'cop');
    };

    return (
        <div className="flight-date-selector">

            <div className="titles-container">
                <img src="./origen.png" alt="Logo" className="title-logo-origin" width="30" height="30"/>
                <h2 className="ida-ant">Ida:</h2>
                <h2 className="route-title">{origen} a {destino}</h2>
            </div>

            <div className="dates-container">
                {dateRange.map(({ date, price }) => (
                    <div 
                        key={date}
                        className={`date-cell ${date === selectedDate ? 'selected-date' : ''}`}
                        onClick={() => handleDateClick(date)}
                    >
                        <div className="day-date">{formatDate(date)}</div>
                        <div className="price">COP{formatPrice(price)}</div>
                    </div>
                ))}
            </div>

            <div className="filters-container">
                <span className="filter-label">Filtrar por:</span>
                <button 
                    className={`filter-button ${filters.mejorPrecio ? 'active' : ''}`}
                    onClick={() => setFilters({ ...filters, mejorPrecio: !filters.mejorPrecio })}
                >
                    Mejor precio
                </button>
                <button 
                    className={`filter-button ${filters.vuelosDirectos ? 'active' : ''}`}
                    onClick={() => setFilters({ ...filters, vuelosDirectos: !filters.vuelosDirectos })}
                >
                    Vuelos directos
                </button>
            </div>
        </div>
    );
};

export default DateSelector;


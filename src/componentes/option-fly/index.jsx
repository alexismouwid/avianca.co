import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './OptionFly.css';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adults: 1,
            youths: 0,
            children: 0,
            infants: 0,
            showCounter: false,
            isOneWay: true,
            origen: 'Bogotá',
            destino: '',
            showOptionsOrigen: false,
            showOptionsDestino: false,
            showReturnDate: false,
            departureDate: null,
            returnDate: null,
            isLoading: false,
            destinations: [
                'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira',
                'Manizales', 'Santa Marta', 'Ibagué', 'Cúcuta', 'Pasto', 'Villavicencio', 'Armenia',
                'Neiva', 'Montería', 'Valledupar', 'Tunja', 'Popayán', 'Sincelejo', 'Riohacha',
                'Florencia', 'Quibdó', 'San Andrés', 'Mocoa', 'Yopal', 'Leticia', 'Inírida',
                'Mitú', 'Puerto Carreño'
            ],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isOneWay !== this.state.isOneWay) {
            this.setState({ showReturnDate: !this.state.isOneWay });
        }
    }

    handleSearch = async (e) => {
        e.preventDefault();

        const { 
            origen, 
            destino, 
            departureDate, 
            returnDate, 
            isOneWay,
            adults = 1,
            youths = 0,
            children = 0,
            infants = 0
        } = this.state;

        // Validaciones
        if (!origen || !destino || !departureDate || (!isOneWay && !returnDate)) {
            alert("Por favor completa todos los campos requeridos");
            return;
        }

        if (origen === destino) {
            alert("Por favor escoja un origen y un destino diferentes");
            return;
        }

        if (adults + youths + children + infants === 0) {
            alert("Debe haber al menos un pasajero");
            return;
        }

        if (!isOneWay && new Date(departureDate) > new Date(returnDate)) {
            alert("La fecha de regreso debe ser posterior a la fecha de ida");
            return;
        }

        // Formatear fechas a YYYY-MM-DD
        const formatDate = (date) => {
            if (!date) return null;
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${year}-${month}-${day}`;
        };

        const searchData = {
            origen: origen.split(' (')[0], // Elimina código de aeropuerto si existe
            destino: destino.split(' (')[0],
            fechaIda: formatDate(departureDate),
            fechaRegreso: isOneWay ? null : formatDate(returnDate),
            pasajeros: adults + youths + children + infants
        };

        try {
            this.setState({ isLoading: true });
            
                    
const response = await fetch('https://back-avianca.vercel.app/vuelos/buscar-vuelos', {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchData),
});        
    if (!response.ok) {
                throw new Error(`Error en la búsqueda (${response.status})`);
            }

            const data = await response.json();
            
            // Pasar resultados al componente padre
            if (this.props.onSearchResults) {
                this.props.onSearchResults(data);
            }

        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "Hubo un error al buscar vuelos");
        } finally {
            this.setState({ isLoading: false });
        }
    };

    getTotalPassengers = () => {
        const { adults, youths, children, infants } = this.state;
        return adults + youths + children + infants;
    };

    increment = (category) => {
        const maxPerCategory = 9;
        const maxTotalPassengers = 18;
        const totalPassengers = this.getTotalPassengers();

        if (this.state[category] < maxPerCategory && totalPassengers < maxTotalPassengers) {
            this.setState((prevState) => ({
                [category]: prevState[category] + 1,
            }));
        }
    };

    decrement = (category) => {
        if (this.state[category] > 0) {
            this.setState((prevState) => ({
                [category]: prevState[category] - 1,
            }));
        }
    };

    toggleCounter = () => {
        this.setState((prevState) => ({
            showCounter: !prevState.showCounter,
        }));
    };

    handleButtonClick = (tripType) => {
        this.setState({ isOneWay: tripType });
    };

    handleOrigenFocus = () => {
        this.setState({ showOptionsOrigen: true });
    };

    handleOrigenBlur = () => {
        setTimeout(() => this.setState({ showOptionsOrigen: false }), 200);
    };

    handleOrigenChange = (e) => {
        this.setState({ origen: e.target.value });
    };

    handleOptionClickOrigen = (value) => {
        this.setState({ origen: value, showOptionsOrigen: false });
    };

    handleDestinoFocus = () => {
        this.setState({ showOptionsDestino: true });
    };

    handleDestinoBlur = () => {
        setTimeout(() => this.setState({ showOptionsDestino: false }), 200);
    };

    handleDestinoChange = (e) => {
        this.setState({ destino: e.target.value });
    };

    handleOptionClickDestino = (value) => {
        this.setState({ destino: value, showOptionsDestino: false });
    };

    handleDepartureDateChange = (date) => {
        this.setState({ departureDate: date });
    };

    handleReturnDateChange = (date) => {
        this.setState({ returnDate: date });
    };

    handleConfirm = () => {
        this.setState({ showCounter: false });
    };

    render() {
        const { 
            adults, youths, children, infants, 
            showCounter, isOneWay, showReturnDate,
            origen, destino, destinations,
            showOptionsOrigen, showOptionsDestino,
            departureDate, returnDate,
            isLoading
        } = this.state;

        const totalPassengers = this.getTotalPassengers();

        return (
            <div className="cajon-azul">
                <div className='container'>
                    <div className="flight-options">
                        <button
                            type="button"
                            className={`flight-button ${!isOneWay ? 'active' : ''}`}
                            onClick={() => this.handleButtonClick(false)}
                        >
                            <span className={`indicator ${!isOneWay ? 'active' : ''}`}></span>
                            Ida y vuelta
                        </button>

                        <button
                            type="button"
                            className={`flight-button ${isOneWay ? 'active' : ''}`}
                            onClick={() => this.handleButtonClick(true)}
                        >
                            <span className={`indicator ${isOneWay ? 'active' : ''}`}></span>
                            Solo ida
                        </button>
                    </div>

                    <div className="container-search">
                        <form onSubmit={this.handleSearch} className="search-fields">
                            <div className="field">
                                <img src="./origen.png" alt="plane icon" className="icon-img" width={40} />
                                <label className="label">Origen</label>
                                <input
                                    type="text"
                                    value={origen}
                                    onChange={this.handleOrigenChange}
                                    onFocus={this.handleOrigenFocus}
                                    onBlur={this.handleOrigenBlur}
                                />
                                {showOptionsOrigen && (
                                    <ul className="dropdown">
                                        {destinations.map((destination, index) => (
                                            <li
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() => this.handleOptionClickOrigen(destination)}
                                            >
                                                {destination}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="field">
                                <img src="./destino.png" alt="plane icon" className="icon-img" width={40} />
                                {destino && <label className="label">Destino</label>}
                                <input
                                    type="text"
                                    placeholder="Destino"
                                    value={destino}
                                    onChange={this.handleDestinoChange}
                                    onFocus={this.handleDestinoFocus}
                                    onBlur={this.handleDestinoBlur}
                                />
                                {showOptionsDestino && (
                                    <ul className="dropdown">
                                        {destinations.map((destination, index) => (
                                            <li
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() => this.handleOptionClickDestino(destination)}
                                            >
                                                {destination}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="date-picker-container">
                                <img src="./calendario.png" alt="calendario icon" className="calendar-icon" width={20} />
                                <label className="label">Ida</label>
                                <DatePicker
                                    selected={departureDate}
                                    onChange={this.handleDepartureDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="date-picker1"
                                    minDate={new Date()}
                                    placeholderText=""
                                />
                            </div>

                            {showReturnDate && (
                                <div className="date-picker-container2">
                                    <img src="./calendario.png" alt="calendario icon" className="calendar-icon2" width={40} />
                                    <label className="label">Vuelta</label>
                                    <DatePicker
                                        selected={returnDate}
                                        onChange={this.handleReturnDateChange}
                                        dateFormat="dd/MM/yyyy"
                                        className="date-picker"
                                        minDate={departureDate || new Date()}
                                        placeholderText=""
                                    />
                                </div>
                            )}

                            <div className='field passenger-counter-container'>
                                <button 
                                    type="button" 
                                    className='button-passengers' 
                                    onClick={this.toggleCounter}
                                >
                                    <img className='img-pasajero' src='./inicio.png' alt="pasajero" width={15} />
                                    <span className='total-pasajeros'> {`(${totalPassengers})`} </span>
                                </button>

                                {showCounter && (
                                    <div id="passengerCounter">
                                        <h2 className='quienes-viajan'>¿Quiénes viajan?</h2>
                                        <div className="counter-group">
                                            <div>
                                                <span className='categorias'>Adultos </span>
                                                <div className='linea1'> 
                                                    <button type="button" className="buttonmen" onClick={() => this.decrement('adults')}>-</button>
                                                    <span>{adults}</span>
                                                    <button type="button" className="buttonsu" onClick={() => this.increment('adults')}>+</button>
                                                </div>
                                            </div>
                                            <div>
                                                <span className='categorias'>Jóvenes </span>
                                                <div className='linea2'> 
                                                    <button type="button" className="buttonmen" onClick={() => this.decrement('youths')}>-</button>
                                                    <span>{youths}</span>
                                                    <button type="button" className="buttonsu" onClick={() => this.increment('youths')}>+</button>
                                                </div>
                                            </div>
                                            <div>
                                                <span className='categorias'>Niños </span>
                                                <div className='linea3'> 
                                                    <button type="button" className="buttonmen" onClick={() => this.decrement('children')}>-</button>
                                                    <span>{children}</span>
                                                    <button type="button" className="buttonsu" onClick={() => this.increment('children')}>+</button>
                                                </div>
                                            </div>
                                            <div>
                                                <span className='categorias'>Bebés </span>
                                                <div className='linea4'> 
                                                    <button type="button" className="buttonmen" onClick={() => this.decrement('infants')}>-</button>
                                                    <span>{infants}</span>
                                                    <button type="button" className="buttonsu" onClick={() => this.increment('infants')}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div> 
                                            <button type="button" className='button-confirmar' onClick={this.handleConfirm}>Confirmar</button> 
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="field">
                                <button 
                                    type="submit" 
                                    className='search-button'
                                    disabled={isLoading}
                                >
                                  Buscar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchForm;

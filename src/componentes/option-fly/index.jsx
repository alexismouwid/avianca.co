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
      origen: 'Bogotá (BOG)',
      destino: '',
      showOptionsOrigen: false,
      showOptionsDestino: false,
      showReturnDate: false,
      departureDate: '05/07/2025',
      returnDate: '10/07/2025',
      destinations: [
        'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira',
        'Manizales', 'Santa Marta', 'Ibagué', 'Cúcuta', 'Pasto', 'Villavicencio', 'Armenia',
        'Neiva', 'Montería', 'Valledupar', 'Tunja', 'Popayán', 'Sincelejo', 'Riohacha',
        'Florencia', 'Quibdó', 'San Andrés', 'Mocoa', 'Yopal', 'Leticia', 'Inírida',
        'Mitú', 'Puerto Carreño', 'Argentina', 'Chile', 'Perú', 'Ecuador', 'Bolivia',
        'Paraguay', 'Uruguay', 'Brasil', 'Venezuela', 'Panamá', 'Costa Rica', 'Guatemala',
        'Honduras', 'El Salvador', 'Nicaragua', 'Belice', 'Estados Unidos', 'Canadá',
        'México', 'España', 'Francia', 'Alemania', 'Italia', 'Reino Unido', 'Países Bajos',
        'Suiza', 'Suecia', 'Noruega',
      ],
    };
  }

componentDidUpdate(prevProps, prevState) {
    if (prevState.isOneWay !== this.state.isOneWay) {
      console.log("Estado de ida y vuelta cambió a:", this.state.isOneWay);
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
    adults = 0,
    youths = 0,
    children = 0,
    infants = 0
  } = this.state;

  if (!origen || !destino || !departureDate || (!isOneWay && !returnDate)) {
    alert("Por favor completa todos los campos requeridos");
    return;
  }

  if(origen === destino) {
    alert("Porfavor escoja un origen y un destino diferentes");
    return;
  }

  if (adults + youths + children + infants === 0) {
  alert("Debe haber al menos un pasajero en la reserva.");
  return;
}


if (!isOneWay && departureDate && returnDate && new Date(departureDate) > new Date(returnDate)) {

    alert("La fecha de regreso debe ser posterior a la fecha de ida.");
    return;
  }

  const reservaData = {
    origen,
    destino,
    fechaIda: departureDate,
    fechaRegreso: isOneWay ? null : returnDate,
    cantidadPersonas: adults + youths + children + infants,
    tipoVuelo: isOneWay ? 'ida' : 'ida y vuelta'
  };

  try {
    const response = await fetch('https://backend-avianca-co.vercel.app/reservas', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reservaData),
    });

    if (!response.ok) throw new Error(`Error al guardar la reserva (${response.status})`);

    try {
      const data = await response.json();
      alert(`Reserva guardada con éxito! ID: ${data._id}`);
      console.log("Respuesta del backend:", data);
      
      this.setState({
        origen: '',
        destino: '',
        departureDate: null,
        returnDate: null,
      });
    } catch (jsonError) {
      console.error("Error al leer la respuesta JSON:", jsonError);
      alert("Error al procesar la respuesta del servidor.");
    }
    
  } catch (error) {
    console.error("Error:", error);
    alert("Hubo un error al guardar la reserva. Por favor intenta nuevamente.");
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
    this.setState({
      showOptionsOrigen: true,
    });
  };

  handleOrigenChange = (e) => {
    this.setState({
      origen: e.target.value,
    });
  };

  handleOptionClickOrigen = (value) => {
    this.setState({
      origen: value,
      showOptionsOrigen: false,
    });
  };

  handleDestinoFocus = () => {
    this.setState({
      showOptionsDestino: true,
    });
  };

  handleDestinoChange = (e) => {
    this.setState({
      destino: e.target.value,
    });
  };

  handleOptionClickDestino = (value) => {
    this.setState({
      destino: value,
      showOptionsDestino: false,
    });
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
    const { adults, youths, children, infants, showCounter } = this.state;
    const totalPassengers = this.getTotalPassengers();

    return (
      <div className="cajon-azul">
        <div className='container'>
          <div className="flight-options">
            <button
              type="button"
              className={`flight-button ${!this.state.isOneWay ? 'active' : ''}`}
              onClick={() => this.handleButtonClick(false)}
            >
              <span className={`indicator ${!this.state.isOneWay ? 'active' : ''}`}></span>
              Ida y vuelta
            </button>

            <button
              type="button"
              className={`flight-button ${this.state.isOneWay ? 'active' : ''}`}
              onClick={() => this.handleButtonClick(true)}
            >
              <span className={`indicator ${this.state.isOneWay ? 'active' : ''}`}></span>
              Solo ida
            </button>
          </div>

          <div className="container-search">
            <div className="search-fields">
              <div className="field">
                <img src="./origen.png" alt="plane icon" className="icon-img" width={40} />
                <label className="label">Origen</label>
                <input
                  type="text"
                  name="origen"
                  value={this.state.origen}
                  onChange={this.handleOrigenChange}
                  onFocus={this.handleOrigenFocus}
                />
                {this.state.showOptionsOrigen && (
                  <ul className="dropdown">
                    {this.state.destinations.map((destination, index) => (
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
  {this.state.destino && <label className="label">Destino</label>}
                <input
                  type="text"
                  name="destino"
                  placeholder="Destino"
                  value={this.state.destino}
                  onChange={this.handleDestinoChange}
                  onFocus={this.handleDestinoFocus}
                />
                {this.state.showOptionsDestino && (
                  <ul className="dropdown">
                    {this.state.destinations.map((destination, index) => (
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
                  selected={this.state.departureDate}
                  onChange={this.handleDepartureDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="date-picker1"
                 
                />
              </div>

              {this.state.showReturnDate && (
                <div className="date-picker-container2">
                  <img src="./calendario.png" alt="calendario icon" className="calendar-icon2" width={40} />
<label className="label">Vuelta</label>
                  <DatePicker
                    selected={this.state.returnDate}
                    onChange={this.handleReturnDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="date-picker"
                    />
                  </div>
                )}

                <div className='field passenger-counter-container'>
                  <button className='button-passengers' onClick={this.toggleCounter}>
                  <img className='img-pasajero' src='./inicio.png' alt="pasajero-image" width={15} />
                    <span className='total-pasajeros'> {`(${totalPassengers})`} </span>
                </button>

                {showCounter && (
                  <div id="passengerCounter">
                    <h2 className='quienes-viajan'>¿Quiénes viajan?</h2>
                    <div className="counter-group">
                      <div>
                        <span className='categorias'>Adultos </span>
                        <div className='linea1'> 
 <button className="buttonmen" onClick={() => this.decrement('adults')}>-</button>
                        <span>{adults}</span>
                        <button className="buttonsu" onClick={() => this.increment('adults')}>+</button>

                        </div>
                                             </div>
                      <div>
                        <span className='categorias'>Jóvenes </span>
                        <div className='linea2'> 
<button className="buttonmen" onClick={() => this.decrement('youths')}>-</button>
                        <span>{youths}</span>
                        <button className="buttonsu" onClick={() => this.increment('youths')}>+</button>
                        </div>
                                              </div>
                      <div>
                        <span className='categorias'>Niños </span>

      <div className='linea3'> 
<button className="buttonmen" onClick={() => this.decrement('children')}>-</button>
                        <span>{children}</span>
                        <button className="buttonsu" onClick={() => this.increment('children')}>+</button>
      </div>
                                              </div>
                      <div>
                        <span className='categorias'>Bebés </span>

                        <div className='linea4'> 
 <button className="buttonmen" onClick={() => this.decrement('infants')}>-</button>
                        <span>{infants}</span>
                        <button className="buttonsu" onClick={() => this.increment('infants')}>+</button>


                        </div>
                                             </div>
                    </div>
                    <div> 
                      <button className='button-confirmar' onClick={this.handleConfirm}> Confirmar </button> 
                    </div>
                                     </div>
                )}
              </div>
 <div className="field">

   <button className='search-button'
   onClick={this.handleSearch}>Buscar</button>
                    </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;


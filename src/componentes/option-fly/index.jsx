import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './OptionFly.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adults: 0,
      youths: 0,
      children: 0,
      infants: 0,
      showCounter: false,
      isOneWay: null,
      origen: '',
      destino: '',
      showOptionsOrigen: false,
      showOptionsDestino: false,
      showReturnDate: false,
      departureDate: null,
      returnDate: null,
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

  handleButtonClick = (type) => {
    this.setState({
      isOneWay: type,
      showReturnDate: type === 'roundTrip',
    });
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

  handleConfirm = () => {
    this.setState({ showCounter: false });
  };
    

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
              className={`flight-button ${this.state.isOneWay === 'roundTrip' ? 'active' : ''}`}
              onClick={() => this.handleButtonClick('roundTrip')}
            >
              <span className={`indicator ${this.state.isOneWay === 'roundTrip' ? 'active' : ''}`}></span>
              Ida y vuelta
            </button>

            <button
              type="button"
              className={`flight-button ${this.state.isOneWay === 'oneWay' ? 'active' : ''}`}
              onClick={() => this.handleButtonClick('oneWay')}
            >
              <span className={`indicator ${this.state.isOneWay === 'oneWay' ? 'active' : ''}`}></span>
              Solo ida
            </button>
          </div>

          <div className="container-search">
            <div className="search-fields">
              <div className="field">
                <img src="./origen.png" alt="plane icon" className="icon-img" width={40} />
                <input
                  type="text"
                  name="origen"
                  placeholder="Origen"
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
                <DatePicker
                  selected={this.state.departureDate}
                  onChange={this.handleDepartureDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="date-picker1"
                  placeholderText="Ida"
                />
              </div>

              {this.state.showReturnDate && (
                <div className="date-picker-container2">
                  <img src="./calendario.png" alt="calendario icon" className="calendar-icon" width={40} />
                  <DatePicker
                    selected={this.state.returnDate}
                    onChange={this.handleReturnDateChange}
                    dateFormat="dd/MM/yyyy"
                    className="date-picker"
                    placeholderText="Vuelta"
                    />
                  </div>
                )}

                <div className='field passenger-counter-container'>
                  <button className='button-passengers' onClick={this.toggleCounter}>
                  <img src='./inicio.png' alt="pasajero-image" width={15} />
                  {`(${totalPassengers})`}
                </button>

                {showCounter && (
                  <div id="passengerCounter">
                    <h2 className='quienes-viajan'>¿Quiénes viajan?</h2>
                    <div className="counter-group">
                      <div>
                        <span>Adultos: </span>
                        <button className="buttonmen" onClick={() => this.decrement('adults')}>-</button>
                        <span>{adults}</span>
                        <button className="buttonsu" onClick={() => this.increment('adults')}>+</button>
                      </div>
                      <div>
                        <span>Jóvenes: </span>
                        <button className="buttonmen" onClick={() => this.decrement('youths')}>-</button>
                        <span>{youths}</span>
                        <button className="buttonsu" onClick={() => this.increment('youths')}>+</button>
                      </div>
                      <div>
                        <span>Niños: </span>
                        <button className="buttonmen" onClick={() => this.decrement('children')}>-</button>
                        <span>{children}</span>
                        <button className="buttonsu" onClick={() => this.increment('children')}>+</button>
                      </div>
                      <div>
                        <span>Bebés: </span>
                        <button className="buttonmen" onClick={() => this.decrement('infants')}>-</button>
                        <span>{infants}</span>
                        <button className="buttonsu" onClick={() => this.increment('infants')}>+</button>
                      </div>
                    </div>
                    <div> 
                      <button className='button-confirmar' onClick={this.handleConfirm}> Confirmar </button> 
                    </div>
                                     </div>
                )}
              </div>
 <div className="field">

   <button className='search-button'>Buscar</button>
                    </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;


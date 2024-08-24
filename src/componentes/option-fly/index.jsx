import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './OptionFly.css';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOneWay: null,
      origen: '',
      destino: '',
      showOptionsOrigen: false,
      showOptionsDestino: false,
      showReturnDate: false,
      departureDate: null,
      returnDate: null,
      destinations: [
        // Ciudades de 
       'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Pereira',
  'Manizales',
  'Santa Marta',
  'Ibagué',
  'Cúcuta',
  'Pasto',
  'Villavicencio',
  'Armenia',
  'Neiva',
  'Montería',
  'Valledupar',
  'Tunja',
  'Popayán',
  'Sincelejo',
  'Riohacha',
  'Florencia',
  'Quibdó',
  'San Andrés',
  'Mocoa',
  'Yopal',
  'Leticia',
  'Inírida',
  'Mitú',
  'Puerto Carreño',       // Países de Latinoamérica
        'Argentina',
        'Chile',
        'Perú',
        'Ecuador',
        'Bolivia',
        'Paraguay',
        'Uruguay',
        'Brasil',
        'Venezuela',
        // Países de Centroamérica
        'Panamá',
        'Costa Rica',
        'Guatemala',
        'Honduras',
        'El Salvador',
        'Nicaragua',
        'Belice',
        // Países de Norteamérica
        'Estados Unidos',
        'Canadá',
        'México',
        // Países de Europa
        'España',
        'Francia',
        'Alemania',
        'Italia',
        'Reino Unido',
        'Países Bajos',
        'Suiza',
        'Suecia',
        'Noruega',
      ],
    };
  }

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
  };

  render() {
    return (
      <div className="cajon-azul">
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

            <div className="field">
              <img src="./calendario.png" alt="calendario icon" className="icon-img" width={40} />
              <DatePicker
                selected={this.state.departureDate}
                onChange={this.handleDepartureDateChange}
                dateFormat="dd/MM/yyyy"
                className="date-picker1"
                placeholderText="Ida"
              />
            </div>
            {this.state.showReturnDate && (
              <div className="field">
                <img src="./calendario.png" alt="calendario icon" className="icon-img" width={40} />
                <DatePicker
                  selected={this.state.returnDate}
                  onChange={this.handleReturnDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="date-picker"
                  placeholderText="Vuelta"
                />
              </div>
            )}

            <button type="button" className="search-button">
              Buscar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;


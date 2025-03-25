import { Component } from "react";
import './afterheader.css';

class Afterheader extends Component {
    constructor(props) {
        super(props);
        this.state = { showMenu: false };
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.dropdownMenuRef = null;
    }

    toggleMenu() {
        this.setState(prevState => ({ showMenu: !prevState.showMenu }));
    }

    handleClickOutside(event) {
        if (this.state.showMenu && this.dropdownMenuRef && !this.dropdownMenuRef.contains(event.target)) {
            this.setState({ showMenu: false });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    render() {
        return (
            <>
                <header className="afterheader-css">
                    <button className='btn-vianca'>
                        <img className='wp-logo' src='wp.png' alt='' width={20} />
                        Vianca Chat
                    </button>
                    <button className="button2">
                        <img src='global.png' alt='global' width={20} className="global-logo" />
                        Español
                    </button>
                    <button className="dropdownButton" onClick={this.toggleMenu}>
                        <img src='dolar.png' alt='bandera-colombia' width={20} className="colombia-logo" />
                        Colombia (COP)
                    </button>
                    {this.state.showMenu && (
                        <div id="dropdownMenu" className="dropdown-content dropdown-active"
                            ref={(element) => { this.dropdownMenuRef = element; }}>
                            <div className="country">Argentina - ARS</div>
                            <div className="country">Bolivia - USD</div>
                            <div className="country">Brasil - BRL</div>
                            <div className="country">Canadá - USD</div>
                            <div className="country">Chile - USD</div>
                            <div className="country">Colombia - COP</div>
                            <div className="country">Costa Rica - USD</div>
                            <div className="country">Ecuador - USD</div>
                            <div className="country">El Salvador - USD</div>
                            <div className="country">España - EUR</div>
                            <div className="country">Estados Unidos - USD</div>
                            <div className="country">Guatemala - USD</div>
                            <div className="country">Honduras - USD</div>
                            <div className="country">México - USD</div>
                            <div className="country">Nicaragua - USD</div>
                            <div className="country">Panamá - USD</div>
                            <div className="country">Paraguay - USD</div>
                            <div className="country">Perú - USD</div>
                            <div className="country">Reino Unido - GBP</div>
                            <div className="country">República Dominicana - USD</div>
                            <div className="country">Uruguay - USD</div>
                        </div>
                    )}
                </header>
            </>
        );
    }
}

export default Afterheader;


import { Component } from "react";
import './header.css'
class Header extends Component {

  render(){
    return(
      <>   
<header className="header">

<ul className="ul">
            <li className="logo"> 
              <img src="./nombre-logo.png" alt="Avianca Logo" />  </li>

  <li className="li1">Reserva</li>
<li className="li2">Ofertas y destinos</li>
  <li className="li3">Tu reserva Check in</li>
          <li className="li4">
            Informacion y ayuda
          </li>
          <li className="li5" >
            lifemiles
          </li >
          <li className="target">
          <button className="button-target"> Tarjeta avianca UATR</button>
          </li>
                      </ul>



                  </header>



      </>

    )
  }
}

export default Header; 

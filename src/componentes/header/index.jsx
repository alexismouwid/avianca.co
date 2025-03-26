
import { useState, useEffect } from "react";
import "./header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
               {/* Botón de menú hamburguesa solo en móvil */}
        {isMobile && (
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
        
        )}
        <span className="logo-rtx"> <img  className="logo-img-rtx" src="./nombre-logo.png" alt="Avianca Logo" width="105px"/></span>
       
        {/* Renderizado condicional de los menús */}
        {isMobile ? (
          <ul className={`nav-links-mobile ${menuOpen ? "active" : ""}`}> 
            

            <div className="header-menu-mobile"> 

              <div className="logo-menu-mobile">
              <img className="logo-img-menu-mobile" src="./nombre-logo.png" alt="Logo" width="150px"></img>
               </div>
          <button className="button-close-menu" onClick={toggleMenu}>
             x
          </button>
           </div>


            <li className="li-mobile">
              <button className="btn1">Reservar </button> 
            </li>
            <li className="li-mobile">
              <button className="btn2">Ofertas y destinos</button>
            </li>
            <li className="li-mobile">
              <button className="btn3">Tu reserva</button>
              <span className="check">Check-in</span>
            </li>
            <li className="li-mobile">
              <button className="btn4">Información y ayuda</button>
            </li>
            <li className="li-end">
              <button className="btn5">lifemiles</button>
            </li>
<li className="li-life">
 {/*Btn-6*/}<button className="btn6">Cuenta lifemiles</button>
            </li>
            


  <div className='footer-menu-mobile'>
<button className='btn-avianca-footer'>
<img src='wp.png' alt='wp-logo' width={20} className="wp-logo" ></img>
    Avianca chat</button>

        <button className="btn1-footer">  <img src='global.png' alt='global'
                   width={20} className="global-logo" ></img>Español </button>
                <button className="btn2-footer">
                    <img src='dolar.png' alt='bandera-colombia'
                   width={20} className="colombia-logo" ></img>
        Colombia (COP)</button>


            </div>

                     </ul>
        ) : (
             
          <ul className="nav-links-desktop">
                      <div className="logo">
              <img src="./nombre-logo.png" alt="Logo" width="170px" />
            </div>

            <li className="li-desktop" >
 {/*Btn-1*/} <button className="button1-desktop">Reservar</button>
            </li>
            
              <li className="li-desktop">
 {/*Btn-2*/}<button className="button2-desktop">
              Ofertas y destinos
             </button>
            </li>
            
                <li className="li-desktop">
 {/*Btn-3*/}   <button className="button3-desktop">Tu reserva
              <span className="check">Check-in</span>
              </button>
            </li>
            

            <li className="li-desktop">
 {/*Btn-4*/} <button className="button4-desktop">Información y ayuda</button>
            </li>
            <li className="li-sexto">
{/*Btn-5*/}<button className="button5-desktop">Lifemiles</button>
            </li>
           

              <li className="li-desktop">
 {/*Btn-6*/}<button className="button6-desktop">Cuenta lifemiles</button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;


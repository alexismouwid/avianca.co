
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
  <li className="li3">Tu reserva <span className="check">Check-in</span></li>
          <li className="li4">
            Informacion y ayuda
          </li>
          <li className="li5" >
            lifemiles
          </li >
          
                      </ul>



                  </header>



      </>

    )
  }
}

export default Header; 



.li2{
 position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 11px;
  transition: 0.20s;
  padding: 0px 15px;
  text-align: center;

}
.li2:hover{
  color: #000000;
  cursor: pointer;
  border-bottom: none;
  border-left: 3px solid red;
  font-weight: bold;

}

.li3{
 position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 11px;
  transition: 0.20s;
  padding: 0px 15px;
  text-align: center;

}
.li3:hover{
  cursor: pointer;
  border-bottom: none;
  border-left: 3px solid blue;
font-weight: bold;


}


.check{
  margin-left: 5px;
  color: white;
  font-weight: bold;
  font-size: 8px;
  background-color: #32aade;
  padding: 2px 5px;
  border-radius: 6px;
}
.li4{
   position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 11px;
  transition: 0.20s;
  padding: 0px 15px;
  text-align: center;
}
.li4:hover{
  cursor: pointer;
  border-bottom: none;
  border-left: 3px solid pink;
font-weight: bold;

}


.li5{

  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 11px;
  transition: 0.20s;
  padding: 0px 15px;
  text-align: center;

}
.li5:hover{
  cursor: pointer;
  border-bottom: none;
  border-left: 3px solid #4a235a;
font-weight: bold;

}



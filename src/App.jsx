import Afterheader from './componentes/afterheader'
import Header from './componentes/header'
import SearchForm from './componentes/option-fly'
import Contenido from './componentes/imagen1'
import Contenido2 from './componentes/content2'
import Ofertas from './componentes/Ofertas'
import PreparateViajar from './componentes/PreparateViajar'
import { useState , useEffect } from 'react'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if(loading) {
    return (
<div className="loader-container">
      <img src="/loader.gif" alt="Cargando..." />
    </div>  
    );
  }
  return (
    <> <div className='App'>
<div className='content-1'> 
<Afterheader />
  <Header />
      <SearchForm /> 
      <Contenido />
  <Ofertas 
  />
  <PreparateViajar />
      </div>





      </div>
               
    </>  
  )
}

export default App

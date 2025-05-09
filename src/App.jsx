import Afterheader from './componentes/afterheader';
import Header from './componentes/header';
import SearchForm from './componentes/option-fly';
import DateSelector from './componentes/DateSelector';
import ResultadosVuelos from './componentes/ResultadosVuelos';
import Contenido from './componentes/imagen1';
import Ofertas from './componentes/Ofertas';
import PreparateViajar from './componentes/PreparateViajar';
import HeaderTwo from './componentes/HeaderTwo';
import SearchFloat from './componentes/Form-flotante';

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [vuelos, setVuelos] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const mostrarSearchFormFlotante = () => {
    setShowFloatingSearch(true);
  };

const ocultarSearchFormFlotante = () => {
  setShowFloatingSearch(false);
};

  const handleSearchResults = async (results) => {
   // 1. Cerrar el modal inmediatamente (acción visual rápida)
  ocultarSearchFormFlotante(); 

  // 2. Iniciar carga de búsqueda (opcional, si mantienes el loader)
  setSearchLoading(true);
  
  // 3. Simular tiempo de carga (o llamada API real)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 4. Actualizar estados y mostrar resultados
  setVuelos(results);
  setShowResults(true);
  setSearchLoading(false);  
   };

  const handleClearResults = () => {
    setVuelos(null);
    setShowResults(false);
  };

  // Mostrar carga inicial
  if(initialLoading) {
    return (
      <div className="loader-container">
        <img src="/loader.gif" alt="Cargando..." />
      </div>  
    );
  }

  // Mostrar carga durante búsqueda
  if(searchLoading) {
    return (
      <div className="loader-container">
        <img src="/loader.gif" alt="Buscando vuelos..." />
      </div>
    );
  }

  return (
    <div className='App'>
      <div className='content-1'> 
        {/* Mostrar Afterheader y Header solo cuando no hay resultados */}
        {!showResults && (
          <>
            <Afterheader />
            <Header />
          </>
        )}
        
        {/* Mostrar HeaderTwo cuando hay resultados */}
        {showResults && <HeaderTwo vuelos={vuelos} onMostrarSearch={mostrarSearchFormFlotante}/>}
        {showFloatingSearch && (
  <div className="search-form-float">
    <SearchFloat
      vuelos={vuelos}
      onSearchResults={handleSearchResults} 
      onClearSearch={handleClearResults}

    />
    <button className="close-btn" onClick={ocultarSearchFormFlotante}>X</button>
  </div>
)}
        {/* Mostrar SearchForm solo cuando no hay resultados */}
        {!showResults && (
          <SearchForm 
            onSearchResults={handleSearchResults} 
            onClearSearch={handleClearResults}
          />
        )}
        
        {/* Mostrar resultados o contenido normal */}
        {showResults ? (
<>  {/* Fragmento agregado */}
    <DateSelector 
      vuelos={vuelos} 
      onSearchResults={handleSearchResults} />
    <ResultadosVuelos vuelos={vuelos} />
  </>
                  ) : (
          <>
            <Contenido />
            <Ofertas />
            <PreparateViajar />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

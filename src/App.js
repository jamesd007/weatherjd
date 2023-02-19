import React, { useState, useEffect } from 'react'
import './App.css';
import Home from './Pages/Home';
import SvnDayForecast from './Pages/SvnDayForecast';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom'
import { CityProvider } from './CityContext'

function App() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);
  useEffect(() => {
    function handleNetworkChange() {
      setIsOnline(window.navigator.onLine);
    }

    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('offline', handleNetworkChange);

    return () => {
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('offline', handleNetworkChange);
    };
  }, []);
  return (

    <div>
      {!isOnline &&
        <div className='content content_header'>
          No internet found, please hook up to use JD'sWeather
        </div>}
      {isOnline &&
        <CityProvider>
          <Navbar />
          <div
          >
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/forecast/:searchCity" element={<SvnDayForecast />} />
              <Route path="/SvnDayForecast" element={<SvnDayForecast />} />
            </Routes>
          </div>
        </CityProvider>}
    </div>
  );
}

export default App;
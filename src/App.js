import React from 'react'
import './App.css';
// import Header from './Header';
// import Footer from './Footer'
// import GetCurrentLoc from './GetCurrentLoc';
// import GetAPIData from './GetAPIData';
// import SearchCities from './SearchCities';
import GetFcast from './GetFcast'
import Home from './Pages/Home';
import SvnDayForecast from './Pages/SvnDayForecast';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom'

function App() {
  // const [city, setCity] = useState(null)

  return (
    <div>

      <Navbar />
      <div
      >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/forecast/:searchCity" element={<SvnDayForecast />} />
          <Route path="/SvnDayForecast" element={<SvnDayForecast />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React, { createContext, useContext, useState } from 'react';

const CityContext = createContext();
const CityUpdateContext = createContext()

export const useCity = () => {
  return useContext(CityContext)
}

export const useCityUpdate = () => {
  return useContext(CityUpdateContext)
}

export function CityProvider({ children }) {
  const [city, setCity] = useState('');

  const changeCity = (newCity) => {
    setCity(prevCity => newCity)
  }

  return (
    <CityContext.Provider value={city}>
      <CityUpdateContext.Provider value={changeCity}>
        {children}
      </CityUpdateContext.Provider>
    </CityContext.Provider>
  );
}


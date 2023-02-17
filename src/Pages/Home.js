import React, { useState } from 'react'
import GetCurrentLoc from '../GetCurrentLoc'
import SearchCities from '../SearchCities'
// import GetAPIData from '../GetAPIData.oldjs'

const Home = () => {
    // const [city, setCity] = useState(null)
    return (
        <div className='content'>
            <GetCurrentLoc />
            <SearchCities
            // searchCity={(val) => setCity(val)}
            />
        </div>
    )
}

export default Home
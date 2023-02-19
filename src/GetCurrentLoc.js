import React, { useState, useEffect } from 'react'
import './App.css'

{/*This component gets the users current location
with user lat and long and gets city data from API*/}

const GetCurrentLoc = () => {
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [status, setStatus] = useState(null);
    const [closestCity, setClosestCity] = useState(null)
    const [temp, setTemp] = useState(null)
    const [humidity, setHumidity] = useState(null)
    const [description, setDescription] = useState(null)
    const [tempUnit, setTempUnit] = useState("°C")
    const API_KEY = process.env.REACT_APP_API_KEY

    const successCallback = (position) => {
        setLong(position.coords.longitude);
        setLat(position.coords.latitude)
    };

    const errorCallback = (status) => {
        setStatus('Geolocation API error')
    };
    const geolocationAPI = navigator.geolocation;

    if (!geolocationAPI)
        setStatus('Geolocation API is not available in your browser!')

    const getUserCoordinates = () => {
        if (!geolocationAPI) {
            setStatus('Geolocation API is not available in your browser!')
        } else {
            geolocationAPI.getCurrentPosition((position) => {
            }, (error) => {
                setStatus('Something went wrong getting your position!')
            })
        }
        return status
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    useEffect(() => {
        const regExp = /^[-+0-9.]+$/;
        async function fetchData() {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${long}&cnt=1&units=metric&appid=${API_KEY}`)
                response
                    .json()
                    .then((response) => {
                        setClosestCity(response.list[0].name)
                        setTemp(response.list[0].main.temp)
                        setHumidity(response.list[0].main.humidity)
                        setDescription(response.list[0].weather[0].description)
                    })
                    .catch((err) => console.error(err));
            }
            catch (err) { console.log("error", err) }
        }
        if (regExp.test(lat) && regExp.test(long))
            fetchData();
    }, [lat, long]);

    const handleClick = () => {
        if (tempUnit === "°F") {
            setTempUnit("°C")
        }
        else {

            setTempUnit("°F")

        }

    }

    return (
        <div >
            <div className='content_header'>
                <span>Location: </span>
                <span className='head_bold_big'>{closestCity}</span>
            </div>
            <div className='content_sub'>
                <p>coordinates: {lat}  ;  {long} </p>
                <div>Temperature:
                    <span
                        className='head_bold_big_dbl'
                    // style={{ marginLeft: "0.5rem" }}
                    >{
                            tempUnit === "°F"
                                ? Math.round((temp * 9 / 5 + 32) * 100) / 100
                                : temp
                        }
                    </span>
                    <button
                        className='deg_btn'
                        // style={{ marginLeft: "0.5rem" }}
                        onClick={handleClick}>
                        {tempUnit}
                    </button>
                </div>
                <p>Humidity: {humidity}
                    <span> %</span>
                </p>
                <p>Description: {description}</p>
            </div>
            <hr></hr>
        </div >
    )
}
export default GetCurrentLoc

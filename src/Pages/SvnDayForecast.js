import React, { useState, useEffect } from 'react'
import '../App.css'
// import { useParams } from 'react-router-dom';
import axios from "axios";
import { useCity } from '../CityContext';
import cloud from '../images/cloud.png';
import sun from '../images/sun.png'
import rain from '../images/rain.png'
import snow from '../images/snow.png'

const SvnDayForecast = () => {
  const searchCity = useCity()
  const API_KEY = process.env.REACT_APP_API_KEY
  const [forecastData, setForecastData] = useState(null)
  const [dataObj, setDataObj] = useState(null)
  const [tempUnit, setTempUnit] = useState("°C")
  // const cityJSON = JSON.parse(searchCity);
  // const cityJSON = searchCity;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${searchCity.lat}&lon=${searchCity.long}&units=metric&appid=${API_KEY}`
      )
      .then((response) => {
        setForecastData(response.data.list);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [searchCity]);

  useEffect(() => {
    if (forecastData) setDataObj(createDataObj())
  }, [forecastData])

  const createDataObj = () => {
    let newDay, prevDate = ""
    let newHigh, newLow, newHumidity, newDescription = null
    let newObj = []
    let tmpObj = null
    const anobject = forecastData
      .map((day, index, array) => {
        newDay = new Date(day.dt * 1000).toDateString()
        if (newDay !== prevDate) {
          newHigh = day.main.temp_max
          newLow = day.main.temp_min
          newHumidity = day.main.humidity
          newDescription = day.weather[0].description
          prevDate = newDay
          if (tmpObj && Object.keys(tmpObj).length > 0) {
            newObj = [...newObj, tmpObj]
            tmpObj = {}
          }
        }
        else {
          if (day.main.temp_max > newHigh) newHigh = day.main.temp_max
          if (day.main.temp_min < newLow) newLow = day.main.temp_min
          if (day.main.temp_humidity > newHumidity) newHumidity = day.main.humidity
          tmpObj = {
            'date': newDay,
            'temp_high': newHigh,
            'temp_low': newLow,
            'humidity': newHumidity,
            'description': newDescription
          }
        }
        if (index === array.length - 1) {
          tmpObj = {
            'date': newDay,
            'temp_high': newHigh,
            'temp_low': newLow,
            'humidity': newHumidity,
            'description': newDescription
          }
          newObj = [...newObj, tmpObj]
          return newObj;
        }
      }
      ).reduce((prevval, currval, acc) => {
        acc = currval
        return acc
      }, {}
      )
    return anobject
  }

  const displayIcon = (desc) => {
    //TODO why are images not appearing?
    let pic = ""
    if (desc.includes("cloud") || desc.includes("clouds")) {
      console.log("tedtest clouds")
      pic = cloud
    }
    else if (desc.includes('clear sky')) pic = sun
    else if (desc.includes('rain')) pic = rain
    else if (desc.includes('snow')) pic = snow
    return (
      <img
        style={{
          height: "2rem",
          // width: "50px",
          objectFit: "cover"
        }}
        id={"image"}
        src={pic}
        alt="logo"
      />
    )
  }

  const handleClick = () => {
    if (tempUnit === "°F") {
      setTempUnit("°C")
    }
    else {

      setTempUnit("°F")

    }
  }

  const CompleteTable = () => {
    if (dataObj) {
      const columnTitles = [
        { label: 'Date' },
        { label: `Temp max`, btn: tempUnit, style: "rgt_content" },
        { label: `Temp min`, btn: tempUnit, style: "rgt_content" },
        { label: 'Humidity', style: "rgt_content" },
        { label: 'Description' },
        { label: 'Icon' }
      ]
      return (
        <div
          className='forecast_grid'>
          {columnTitles.map((title, index) => (
            <div
              key={index}
              className={title.style ? `${title.style}` : {}}>
              <span
                key={title + index}
                style={{ fontWeight: "bold" }}>
                {title.label}
              </span>
              <div>
                {title.btn && <button
                  className='deg_btn'
                  onClick={handleClick}>
                  {title.btn}
                </button>
                }
              </div>
            </div>
          ))}
          {
            dataObj.map((item, index) => (
              <React.Fragment
                key={`${item.data}+${index}`}
              >
                <span
                  key={`${item.date}_date`}>
                  {item.date}
                </span>
                <span
                  key={`${item.date}_thigh`}
                  className="rgt_content">{
                    tempUnit === "°F"
                      ? Math.round((item.temp_high * 9 / 5 + 32) * 100) / 100
                      : item.temp_high
                  }
                </span>
                <span
                  key={`${item.date}_tlow`}
                  className="rgt_content">{
                    tempUnit === "°F"
                      ? Math.round((item.temp_low * 9 / 5 + 32) * 100) / 100
                      : item.temp_low
                  }
                </span>
                <span
                  key={`${item.date}_humid`}
                  className="rgt_content">
                  {item.humidity}
                </span>
                <span
                  key={`${item.date}_desc`}>{item.description}</span>
                <span
                  key={`${item.date}_icon`}>{displayIcon(item.description)}</span>
              </React.Fragment>
            )
            )}
        </div>
      )
    }
    return null
  }

  return (
    <div className='content'>
      <div className='head_bold_big'>
        {searchCity.city}
        <hr></hr>
      </div>
      <CompleteTable />
    </div>
  )
}

export default SvnDayForecast
import React, { useState, useEffect } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';
import axios from "axios";

const SvnDayForecast = () => {
  const { searchCity } = useParams();
  const API_KEY = process.env.REACT_APP_API_KEY
  const [forecastData, setForecastData] = useState(null)
  const [dataObj, setDataObj] = useState(null)

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=metric&appid=${API_KEY}`
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
    let image = ""
    if (desc.includes("cloud") || desc.includes("clouds")) image = '/images/cloud.png'
    else if (desc.includes('clear sky')) image = '/images/sun.png'
    else if (desc.includes('rain')) image = '/images/rain.png'
    else if (desc.includes('snow')) image = '/images/snow.png'
    return (
      <img
        id={image}
        style={{ objectFit: "cover" }}
        src={image}
        alt="logo"
      />
    )
  }

  const CompleteTable = () => {
    if (dataObj) {
      const columnTitles = [
        { label: 'Date' },
        { label: 'Temp max' },
        { label: 'Temp min' },
        { label: 'humidity' },
        { label: 'description' },
        { label: 'icon' }
      ]
      return (
        <div
          className='forecast_grid'>
          {columnTitles.map(title => (
            // <div>
            <span style={{ fontWeight: "bold" }}>{title.label}</span>
            // </div>
          ))}
          {/* <hr></hr> */}
          {
            dataObj.map((item) => (
              <React.Fragment>
                <span>{item.date}</span>
                <span>{item.temp_high}</span>
                <span>{item.temp_low}</span>
                <span>{item.humidity}</span>
                <span>{item.description}</span>
                <span>{displayIcon(item.description)}</span>
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
        {searchCity}
        <hr></hr>
      </div>
      <div>
        {dataObj && <CompleteTable />}
      </div>
    </div>
  )
}

export default SvnDayForecast
import React, { useState, useEffect } from "react";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY

const SevenDayForecast = () => {
    const [forecastData, setForecastData] = useState([]);

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=${API_KEY}`
            )
            .then((response) => {
                setForecastData(response.data.list);
                console.log("RESPONSE=", response)
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    const dateData = (dayDt) => {
        let a = new Date(dayDt * 1000)
        let mnth = (a.getMonth() + 1).toString()
        if (mnth.length === 1) mnth = "0" + mnth
        let dayNum = (a.getDate()).toString()
        if (dayNum.length === 1) dayNum = "0" + dayNum
        let dateStr = a.getFullYear() + "-" + mnth + "-" + dayNum
        let t = a.getDay()
        let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
        let dayStr = days[t]
        let hrs = a.getHours().toString()
        if (hrs.length === 1) hrs = "0" + hrs
        let mins = a.getMinutes().toString()
        if (mins.length === 1) mins = "0" + mins
        return (
            dateStr + "   " + dayStr + "   " + hrs + ":" + mins
        )
    }
    const getTimeStr = (dayDt) => {
        let a = new Date(dayDt * 1000)
        let hrs = a.getHours().toString()
        if (hrs.length === 1) hrs = "0" + hrs
        let mins = a.getMinutes().toString()
        if (mins.length === 1) mins = "0" + mins
        let timeStr = hrs + ":" + mins
        return (
            timeStr
        )
    }

    const createDataObj = () => {
        let newDay, prevDate, nextDate = ""
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
    }

    return (
        <div>
            <div>
                {createDataObj()}
            </div>

            <h2>Seven Day Forecast</h2>
            <ul>
                {forecastData.map((day) => (
                    <li key={day.dt}>
                        {(getTimeStr(day.dt) === "05:00" || getTimeStr(day.dt) === "14:00") &&
                            <p>
                                <span>{new Date(day.dt * 1000).toDateString()}</span>
                                <span>{getTimeStr(day.dt)}</span>
                            </p>}
                        {getTimeStr(day.dt) === "14:00" && <p>High: {day.main.temp_max}°C</p>}
                        {getTimeStr(day.dt) === "05:00" && <p>Low: {day.main.temp_min}°C</p>}
                        {(getTimeStr(day.dt) === "05:00" || getTimeStr(day.dt) === "14:00") &&
                            <p>{day.weather[0].description}</p>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SevenDayForecast;

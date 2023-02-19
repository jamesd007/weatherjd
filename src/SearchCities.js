import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCity, useCityUpdate } from './CityContext'

const SearchCities = (props) => {
    const REACT_APP_MAPBOX_API = process.env.REACT_APP_MAPBOX_API
    const [city, setCity] = useState("");
    // const [coords, setCoords] = useState({})
    const [autocompleteCities, setAutocompleteCities] = useState([]);
    const [autocompleteErr, setAutocompleteErr] = useState("");
    const navigate = useNavigate()
    const coords = useCity()
    const setCoords = useCityUpdate()
    const [chk, setChk] = useState(false)

    const fetchPlace = async (text) => {
        try {
            const res = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?proximity=ip&types=place&access_token=${REACT_APP_MAPBOX_API}`
            );
            if (!res.ok) throw new Error(res.statusText);
            return res.json();
        } catch (err) {
            return { error: "Unable to retrieve places" };
        }
    };

    const handleCityChange = async (e) => {
        setCity(e.target.value);
        let tcity = e.target.value
        if (!tcity) {
            setAutocompleteCities([])
            return;
        }
        const res = await fetchPlace(tcity);
        if (res) setCoords({ city: e.target.value, lat: res.features[0].geometry.coordinates[1], long: res.features[0].geometry.coordinates[0] })
        else setCoords({ city: "not found", lat: 0, long: 0 })
        !autocompleteCities.includes(e.target.value) &&
            res.features &&
            setAutocompleteCities(res.features.map((place) => place.place_name));
        res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
        setChk(autocompleteCities.includes(e.target.value))
    };

    const handleClick = () => {
        const path = `/forecast/${encodeURIComponent(JSON.stringify(coords))}`;
        if (chk) navigate(path);
    }

    return (
        <div>
            <div>
                <div
                    className='head_bold_big'>
                    Forecast
                </div>
                <div>
                    current city:  {coords.city}
                </div>
                <label
                    className="label">
                    Your city
                    {autocompleteErr && (
                        <span className="inputError">{autocompleteErr}</span>
                    )}
                </label>
                <input
                    className="input_box"
                    list="places"
                    type="text"
                    id="city"
                    name="city"
                    onChange={handleCityChange}
                    value={city}
                    required
                    autoComplete="off"
                />
                <datalist id="places">
                    {autocompleteCities.map((city, i) => (
                        <option
                            key={i}
                        >
                            {city}
                        </option>
                    ))}
                </datalist>
                <div className="placesAutocomplete__hint">
                    *start typing and choose your city from the given options
                </div>
                <button
                    className={!chk ? 'btn_submit-disabled' : 'btn_submit'}
                    type="submit"
                    onClick={handleClick}>
                    Submit
                </button>
            </div>
        </div>
    )
}

export default SearchCities
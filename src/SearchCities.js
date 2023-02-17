import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchCities = (props) => {
    const REACT_APP_MAPBOX_API = process.env.REACT_APP_MAPBOX_API
    const [city, setCity] = useState("");
    const [autocompleteCities, setAutocompleteCities] = useState([]);
    const [autocompleteErr, setAutocompleteErr] = useState("");
    const navigate = useNavigate()

    // access_token = "YOUR_MAPBOX_ACCESS_TOKEN"
    // url = f"https://api.mapbox.com/geocoding/v5/mapbox.places/{query}.json?types=place&access_token={access_token}"
    // `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json?proximity=ip&access_token=${REACT_APP_MAPBOX_API}`

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
        !autocompleteCities.includes(e.target.value) &&
            res.features &&
            setAutocompleteCities(res.features.map((place) => place.place_name));
        res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
    };

    const handleClick = () => {
        navigate(`/forecast/${city}`
        );
    }

    return (
        <div>
            <div>
                <div
                    className='head_bold_big'>Forecast</div>

                <label
                    // htmlFor="city" 
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
                    // pattern={autocompleteCities.join("|")}
                    autoComplete="off"
                />
                <datalist id="places">
                    {autocompleteCities.map((city, i) => (
                        <option key={i}>{city}</option>
                    ))}
                </datalist>
                <div className="placesAutocomplete__hint">
                    *start typing and choose your city from the given options
                </div>
                <button
                    className='btn_submit' type="submit"
                    onClick={handleClick}>Submit</button>
            </div>
        </div>
    )
}

export default SearchCities
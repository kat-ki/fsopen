import services from "./services.js";
import {useEffect, useState} from "react";

export const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        services
            .getWeather(capital)
            .then(response => {
                setWeather(response)
            })
            .catch(err => alert(err.message))
    }, [capital]);

    return (
        <div>
            {
                weather ?
                    <div>
                        <p>Temperature: {Math.round(weather.main.temp)} °C</p>
                        <p>Humidity: {weather.main.humidity} %</p>
                        <div>
                            <img src={weather.weatherIcon}
                                 alt={'weather-icon'}
                                 style={{width: '50px', height: '50px'}}
                            />
                            <h5>{weather.weather[0].main}</h5>
                        </div>
                        <p>Wind speed: {weather.wind.speed} km/h</p>
                    </div>
                    : 'Loading ...'
            }

        </div>
    )
}
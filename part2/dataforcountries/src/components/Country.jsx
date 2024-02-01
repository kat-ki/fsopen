import {Weather} from "./Weather.jsx";

export const Country = ({country}) => {

    return (
        <>
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} km²</p>
            <div>
                <h4>Languages:</h4>
                <ul>
                    {Object.entries(country.languages).map(([key, value]) => (
                        <li key={key}>{value}</li>
                    ))}
                </ul>
            </div>

            <div>
                <img src={country.flags.png}
                     alt={`Flag of ${country.name.common}`}
                     style={{width: '160px', height: '100px'}}/>
            </div>
            <div>
                <h4>Weather in {country.capital}</h4>
                <Weather capital={country.capital}/>
            </div>
        </>
    )
}

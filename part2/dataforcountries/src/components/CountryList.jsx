import {Country} from "./Country.jsx";
import '../index.css'

export const CountryList = ({filteredCountries, showCountry, onShowCountry}) => {

    return (
        <div>
            {
                filteredCountries.length > 10
                    ? 'Too many matches. Please specify another filter'

                    : filteredCountries.length === 1
                        ? filteredCountries.map((country) => (
                            <div key={country.flag}>
                                <Country country={country}/>
                            </div>

                        ))

                        : filteredCountries.map((country) => (
                            <div key={country.flag} className={'showList'}>
                                <h3>{country.name.common}</h3>
                                <button
                                    onClick={() => onShowCountry(country)}>{showCountry === country ? 'hide' : 'show'}
                                </button>
                                {showCountry === country && <Country country={country}/>}
                            </div>
                        ))
            }
        </div>
    );
};
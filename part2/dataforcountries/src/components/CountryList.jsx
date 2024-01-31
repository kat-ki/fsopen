export const CountryList = ({filteredCountries}) => {
    console.log(filteredCountries)

    return (
        <div>
            {
                filteredCountries.length > 10
                    ? 'Too many matches. Please specify another filter'
                    : filteredCountries.length === 1
                        ? filteredCountries.map((c) => (
                            <div key={c.flag}>
                                <h3>{c.name.common}</h3>
                                <p>Capital: {c.capital}</p>
                                <p>Area: {c.area}</p>
                                <div>
                                    <ul>
                                        {Object.entries(c.languages).map(([key, value]) => (
                                            <li key={key}>{value}</li>
                                        ))}
                                    </ul>

                                </div>
                                <p>Languages:</p>

                                <img src={c.flags.png} alt={'flag'} style={{width: '160px', height: '100px'}}/>
                            </div>
                        ))
                        : filteredCountries.map((c) => (
                            <div key={c.flag}>
                                <h3>{c.name.common}</h3>
                            </div>
                        ))
            }
        </div>
    );
};
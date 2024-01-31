export const CountryList = ({filteredCountries}) => {
    console.log(filteredCountries)

    /*  const languages = filteredCountries.languages.map((lang) => {
          return <li key={lang.iso639_1}>{lang.name}</li>
      })*/

    return (
        <div>
            {
                filteredCountries.length > 10
                    ? 'Too many matches. Please specify another filter'
                    : filteredCountries.length === 1
                        ? filteredCountries.map((c) => (
                            <div key={c.name.common}>
                                <h3>{c.name.common}</h3>
                                <p>Capital: {c.capital}</p>
                                <p>Area: {c.area}</p>
                                <div>
                                    {/*<ul>
                                    {c.map((lang) => <li>{lang.name}</li>}
                                </ul>*/}
                                </div>
                                <p>Languages:</p>

                                <img src={c.flags.png} style={{width: '160px', height: '100px'}}/>
                            </div>
                        ))
                        : filteredCountries.map((c) => (
                            <div key={c.name.common}>
                                <h3>{c.name.common}</h3>
                            </div>
                        ))
            }
        </div>
    );
};
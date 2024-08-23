import React, {useState, useEffect} from 'react'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
                if (response.ok) {
                    const result = await response.json();
                    setCountry({found: true, result});
                } else {
                    setCountry({found: false});
                }
            } catch (error) {
                console.error('Error fetching country data:', error);
                setCountry({found: false});
            }
        };

        if (name) {
            fetchData();
        }
    }, [name])

    return country;
}

const Country = ({country}) => {
    if (!country) {
        return null
    }

    if (!country.found) {
        return (
            <div>
                not found...
            </div>
        )
    }

    return (
        <div>
            <h3>{country.result.name.common} </h3>
            <div>capital: {country.result.capital[0]} </div>
            <div>population: {country.result.population}</div>
            <img src={country.result.flags.png} height='100' alt={`flag of ${country.result.flags.alt}`}/>
        </div>
    )
}

const AppCountryHook = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={fetch}>
                <input {...nameInput} />
                <button>find</button>
            </form>

            <Country country={country}/>
        </div>
    )
}

export default AppCountryHook
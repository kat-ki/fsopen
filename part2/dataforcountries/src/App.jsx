import './App.css'
import {useEffect, useState} from "react";
import services from "./components/services.js";
import {SearchInput} from "./components/SearchInput.jsx";
import {CountryList} from "./components/CountryList.jsx";

function App() {
    const [countries, setCountries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCountry, setShowCountry] = useState(null);

    useEffect(() => {
        services
            .getCountries()
            .then(initList => {
                setCountries(initList)
            })
    }, []);

    const onSearch = (event) => {
        setSearchQuery(event.target.value)
    }

    const filteredCountries = searchQuery !== ''
        ? countries.filter(c => c.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
        : []
    ;

    const onShowCountry = (country) => {
        setShowCountry(showCountry === country ? null : country)
    }

    return (
        <div className={'container'}>
            <p>Find countries</p>
            <SearchInput value={searchQuery} onSearch={onSearch}/>
            <CountryList filteredCountries={filteredCountries}
                         showCountry={showCountry}
                         onShowCountry={onShowCountry}/>
        </div>
    )
}

export default App

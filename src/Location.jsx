import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

const Location = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountries] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const fetchCountries = async() => {
    try{
    let res = await axios.get('https://crio-location-selector.onrender.com/countries')
    // console.log(res.data);
    setCountries(res.data);
    }
    catch(e){

    }
  }

  const handleCountrySelect = (e) =>{
// console.log(e.target.value);
setSelectedCountries(e.target.value);
  }

  const handleStateSelect = (e) =>{
    // console.log(e.target.value);
    setSelectedState(e.target.value);
      }

      const handleCitySelect = (e) =>{
        // console.log(e.target.value);
        setSelectedCity(e.target.value);
          }

  useEffect(()=>{
fetchCountries();
  },[])

const fetchStates = async()=> {
  try{
  let res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
  setStates(res.data);
  }
  catch(e){

  }
}
  useEffect(()=>{
    setCities([])
    setStates([]);

    fetchStates();
  }, [selectedCountry])

  const fetchCities = async()=> {
    try{
    let res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
    setCities(res.data);
    }
    catch(e){

    }
  }

  useEffect(()=>{
    fetchCities();
  }, [selectedState])


  return (
    <>
    <div style={{display:'flex', flexDirection:'column'}}>
      <h2 style={{alignSelf:'center'}}>Select Location</h2>
      <div style={{display:'flex', justifyContent:'space-around'}}>
        <div>
          <select type='text' onChange={handleCountrySelect}>
            <option value={selectedCountry} disabled selected>Select Country</option>
            {countries.map((country)=> <option value={country} key={country}>{country}</option>)}
          </select>
        </div>


        <div>
          <select type='text' onChange={handleStateSelect}>
            <option value="" selected>Select State</option>
            {states.map((state)=> <option value={state} key={state}>{state}</option>)}
          </select>
        </div>

        <div>
          <select type='text' onChange={handleCitySelect}>
            <option value="" selected>Select City</option>
            {cities.map((city)=> <option value={city} key={city}>{city}</option>)}
          </select>
        </div>

       

      </div>
      <div>You selected - Country: {selectedCountry} State:{selectedState} City: {selectedCity}</div>
    </div>
    </>
  )
}

export default Location
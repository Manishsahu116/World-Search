// src/services/api.js
import countriesData from '../assets/data.json';

// Fetch countries from local data.json
export const fetchCountries = async () => {
  return countriesData;
};

// Fetch a specific country by cca3 code from local data.json
export const fetchCountryDetails = async (cca3) => {
  const country = countriesData.find(country => country.alpha3Code === cca3); // Find the specific country
  if (!country) throw new Error('Country not found');
  return country;
};

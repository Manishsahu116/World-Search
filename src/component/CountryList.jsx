import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCountries } from '../services/api';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    let results = countries;

    if (search) {
      results = results.filter(country =>
        country.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region !== 'All') {
      results = results.filter(country => country.region === region);
    }

    setFilteredCountries(results);
  }, [search, region, countries]);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="p-6">
      {/* Search and Filter Options */}
      <div className="flex flex-col md:flex-row md:justify-between mb-6">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-md w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"/>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg shadow-md md:w-1/4 mt-4 md:mt-0 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Country Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCountries.map(country => (
          <Link
            to={`/country/${country.alpha3Code}`}
            key={country.alpha3Code}
            className="block border border-gray-300 rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-700 hover:shadow-xl transition-shadow duration-300 hover:scale-105">
            <div className="h-full">
              <img
                src={country.flags.png}
                alt={`${country.name} flag`}
                className="w-full h-40 object-cover transition-transform transform hover:scale-105"/>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{country.name}</h3>
                <p className="text-gray-700 dark:text-gray-300">Region: {country.region}</p>
                <p className="text-gray-700 dark:text-gray-300">Subregion: {country.subregion}</p>
                <p className="text-gray-700 dark:text-gray-300">Population: {country.population.toLocaleString()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryList;

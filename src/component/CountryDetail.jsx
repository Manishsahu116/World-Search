import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCountryDetails } from '../services/api';
import BackButton from './BackButton'; 

const CountryDetail = ({ theme }) => {
  const { cca3 } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const data = await fetchCountryDetails(cca3);
        setCountry(data);
      } catch (error) {
        console.error('Error fetching country details:', error);
      } finally {
        setLoading(false);
      }
    };
    getCountryDetails();
  }, [cca3]);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (!country) return <div className="text-center py-4">Country not found</div>;

  return (
    <div className="min-h-screen dark:bg-gray-900  dark:text-white transition-colors duration-300">
      <div className="p-6">
        <BackButton theme={theme} />  

        <div className="flex flex-col md:flex-row md:items-center mt-6">
          <img
            src={country.flags.png}
            alt={`${country.name} flag`}
            className="w-full md:w-1/3 object-cover rounded-lg mb-4 md:mb-0 shadow-lg"
          />
          <div className="md:ml-6">
            <h1 className="text-4xl font-extrabold mb-4">{country.name}</h1>
            <p className="text-lg mb-2"><strong>Capital:</strong> {country.capital}</p>
            <p className="text-lg mb-2"><strong>Region:</strong> {country.region}</p>
            <p className="text-lg mb-2"><strong>Subregion:</strong> {country.subregion}</p>
            <p className="text-lg mb-2"><strong>Population:</strong> {country.population.toLocaleString()}</p>
            <p className="text-lg mb-2"><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
            <p className="text-lg mb-2"><strong>Languages:</strong> {country.languages.map(lang => lang.name).join(', ')}</p>
            <p className="text-lg mb-2"><strong>Currencies:</strong> {country.currencies.map(curr => curr.name).join(', ')}</p>

            {country.borders && country.borders.length > 0 && (
              <div className="mt-4">
                <strong className="block mb-2">Border Countries:</strong>
                <ul className="flex flex-wrap gap-2">
                  {country.borders.map(border => (
                    <li key={border} className="bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg px-3 py-1 shadow-md transition-transform hover:scale-105">
                      <Link to={`/country/${border}`} className="text-sm">{border}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;

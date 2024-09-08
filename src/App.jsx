import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './component/CountryList';
import CountryDetail from './component/CountryDetail';
import NavBar from './component/NavBar';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={theme}>
        <NavBar theme={theme} toggleTheme={toggleTheme} />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<CountryList />} />
            <Route path="/country/:cca3" element={<CountryDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

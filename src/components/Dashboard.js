// Dashboard.js

import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import '../styles/Stock.css';
import Signup from './Signup';
import { fetchStockData, fetchStockDetail, fetchHistoricalData } from '../services/StockList';
import StockChart from '../services/StockChart';
import SortButton from '../services/SortButton';
import Theme from '../services/Theme'; // Import Theme component

const Dashboard = () => {
  const [isSliderOpen, setSliderOpen] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isDarkMode, setDarkMode] = useState(false);
  const [showSearchOption, setShowSearchOption] = useState(true); // Default to true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStockData();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleSlider = () => {
    setSliderOpen(!isSliderOpen);
    setShowSignup(false);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setSliderOpen(false);
  };

  const openStockDetails = async (symbol) => {
    try {
      const details = await fetchStockDetail(symbol);
      const historicalData = await fetchHistoricalData(details.symbol);
      setSelectedStock({ ...details, historicalData });
    } catch (error) {
      console.error('Error fetching stock details:', error);
      setSelectedStock(null);
    }
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
  };

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };

  const toggleSearchOption = () => {
    setShowSearchOption(!showSearchOption);
  };

  const sliderHeight = showSearchOption ? 180 : 100;

  return (
    <div className={`dashboard ${isDarkMode ? 'dark-theme' : ''}`} style={{ height: `${sliderHeight}px` }}>
      <button className="slider-toggle" onClick={toggleSlider}>
        ☰
      </button>

      <div className={`slider-content ${isSliderOpen ? 'open' : ''}`}>
        <div className="slider-card">
          <nav>
            <ul>
              <li className="inline-checkbox">
                <input
                  type="checkbox"
                  id="searchOption"
                  checked={showSearchOption}
                  onChange={toggleSearchOption}
                />
                <label htmlFor="searchOption">Search</label>
              </li>

              <li onClick={toggleSignup}><a href="#signup">Signup</a></li>
              <li onClick={toggleTheme}><a href="#theme">Theme</a></li>
            </ul>
          </nav>
          <div className="back-link" onClick={toggleSlider}>
            <a href="#">Back</a>
          </div>
        </div>
      </div>

      {showSignup ? (
        <Signup />
      ) : (
        <div>
          <h1>Stock Market</h1>
          {showSearchOption && (
            <div>
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          <SortButton onClick={handleSort} sortOrder={sortOrder} />
          <div className="stock-cards">
            {stockData
              .filter((stock) => stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .sort((a, b) => (sortOrder === 'asc' ? a.latestPrice - b.latestPrice : b.latestPrice - a.latestPrice))
              .map((stock) => (
                <div key={stock.symbol} className="stock-card">
                  <p onClick={() => openStockDetails(stock.symbol)}>{stock.name}</p>
                  {selectedStock && selectedStock.symbol === stock.symbol && (
                    <div className="stock-details-panel">
                      <p>Symbol: {selectedStock.symbol}</p>
                      <p>Company Name: {selectedStock.companyName}</p>
                      <p>Latest Price: {selectedStock.latestPrice}</p>
                      <StockChart historicalData={selectedStock.historicalData} />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

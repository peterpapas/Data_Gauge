import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';


function Apicall() {const [axiosData, setAxiosData] = useState([]);
  const [fetchData, setFetchData] = useState([]);
  const [jqueryData, setJqueryData] = useState([]);
  const [xmlData, setXmlData] = useState([]);

  const [axiosTime, setAxiosTime] = useState(null);
  const [fetchTime, setFetchTime] = useState(null);
  const [jqueryTime, setJqueryTime] = useState(null);
  const [xmlTime, setXmlTime] = useState(null);

  const [numOutputs, setNumOutputs] = useState(10); // default value
  const [apiUrl, setApiUrl] = useState('https://api.coingecko.com/api/v3/coins/list');

  const handleAxiosClick = async () => {
    setAxiosTime(null);
    const start = performance.now();
    const response = await axios.get(apiUrl);
    let data = response.data;
    if (Array.isArray(data)) {
      data = data.slice(0, numOutputs);
    } else if (data.results) {
      data = data.results.slice(0, numOutputs);
    }
    setAxiosData(data);
    const end = performance.now();
    setAxiosTime((end - start).toFixed(2));
  };

  const handleFetchClick = async () => {
    setFetchTime(null);
    const start = performance.now();
    const response = await fetch(apiUrl);
    let data = await response.json();
    if (Array.isArray(data)) {
      data = data.slice(0, numOutputs);
    } else if (data.results) {
      data = data.results.slice(0, numOutputs);
    }
    setFetchData(data);
    const end = performance.now();
    setFetchTime((end - start).toFixed(2));
  };

  const handleJqueryClick = async () => {
    setJqueryTime(null);
    const start = performance.now();
    $.ajax({
      url: apiUrl,
      success: function (data) {
        let filteredData = data;
        if (Array.isArray(data)) {
          filteredData = data.slice(0, numOutputs);
        } else if (data.results) {
          filteredData = data.results.slice(0, numOutputs);
        }
        setJqueryData(filteredData);
        const end = performance.now();
        setJqueryTime((end - start).toFixed(2));
      },
    });
  };

  const handleXmlClick = async () => {
    setXmlTime(null);
    const start = performance.now();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        let filteredData = data;
        if (Array.isArray(data)) {
          filteredData = data.slice(0, numOutputs);
        } else if (data.results) {
          filteredData = data.results.slice(0, numOutputs);
        }
        setXmlData(filteredData);
        const end = performance.now();
        setXmlTime((end - start).toFixed(2));
      }
    };
    xhr.send();
  };

  const handleInputChange = event => {
    const value = event.target.value;
    setNumOutputs(value);
  };

  const handleSelectChange = event => {
    const value = event.target.value;
    setApiUrl(value);
  };


  return (
    <div className="bg-gray-100 rounded-lg shadow-lg px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Coin Currencies</h2>

      <div className="mb-4">
  <label htmlFor="numOutputs" className="block">
    <span className="text-gray-700">Number of Outputs:</span>
    <input
      id="numOutputs"
      name="numOutputs"
      type="number"
      min="1"
      max="100"
      value={numOutputs}
      onChange={handleInputChange}
      className="ml-2 p-2 border border-gray-300 rounded-md"
    />
  </label>
</div>
<div className="mb-4">
<label htmlFor="apiSelect" className="block">
  <span className="text-gray-700">API:</span>
  <select id="apiSelect" onChange={handleSelectChange} value={apiUrl} className="ml-2 p-2 border border-gray-300 rounded-md">
    <option value="https://api.coingecko.com/api/v3/coins/list">CoinGecko</option>
    <option value="https://pokeapi.co/api/v2/pokemon">PokeAPI</option>
    <option value="https://jsonplaceholder.typicode.com/posts">JSONPlaceholder</option>
  </select>
</label>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200">Axios Data</h3>
        <button onClick={handleAxiosClick}>Fetch Data</button>
        {axiosTime && <p className="text-gray-700">Time elapsed: {axiosTime} ms</p>}
        <ul className="divide-y divide-gray-200">
          {axiosData.map(currency => (
            <li key={currency.id} className="px-6 py-4">
              <p className="text-xl font-medium text-gray-900">{currency.name} ({currency.id})</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200">Fetch Data</h3>
        <button onClick={handleFetchClick}>Fetch Data</button>
        {fetchTime && <p className="text-gray-700">Time elapsed: {fetchTime} ms</p>}
        <ul className="divide-y divide-gray-200">
          {fetchData.map(currency => (
            <li key={currency.id} className="px-6 py-4">
              <p className="text-xl font-medium text-gray-900">{currency.name} ({currency.id})</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200">JQuery Ajax Data</h3>
        <button onClick={handleJqueryClick}>Fetch Data</button>
        {jqueryTime && <p className="text-gray-700">Time elapsed: {jqueryTime} ms</p>}
        <ul className="divide-y divide-gray-200">
          {jqueryData.map(currency => (
            <li key={currency.id} className="px-6 py-4">
              <p className="text-xl font-medium text-gray-900">{currency.name} ({currency.id})</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 px-6 py-4 border-b border-gray-200">XML HTTP Request Data</h3>
        <button onClick={handleXmlClick}>Fetch Data</button>
        {xmlTime && <p className="text-gray-700">Time elapsed: {xmlTime} ms</p>}
        <ul className="divide-y divide-gray-200">
          {xmlData.map(currency => (
            <li key={currency.id} className="px-6 py-4">
              <p className="text-xl font-medium text-gray-900">{currency.name} ({currency.id})</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Apicall;
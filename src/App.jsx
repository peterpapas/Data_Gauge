import { useState } from 'react'
import './App.css'
import Apicall from './Apicall'
import gauge from './assets/Gauge.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
<h1 className="text-4xl font-bold text-gray-900 mb-4">DataGauge</h1>
<img src={gauge} alt="gauge meter" className="w-full max-w-lg mx-auto" />
  <h2 className="text-lg font-medium text-gray-800 mb-8">Data Request Performance Analyzer</h2>
  <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-md">
    <p className="text-base font-normal text-gray-700 leading-6">
      This project is a simple application designed to showcase and compare different data request methods. In this particular example, the API used is the well-known coin data provider, api.coingecko.com. The app offers a user-friendly interface for testing purposes, with different data request methods available including&nbsp;
      <span className="font-bold text-blue-600">Axios</span>,&nbsp;
      <span className="font-bold text-blue-600">Fetch</span>,&nbsp;
      <span className="font-bold text-blue-600">jQuery</span>, and&nbsp;
      <span className="font-bold text-blue-600">XML</span>.&nbsp;
    </p>
  </div>
  <div className="bg-white rounded-lg shadow-lg p-6 mb-8 max-w-md">
    <p className="text-base font-normal text-gray-700 leading-6">
      The project has been developed using modern web technologies such as&nbsp;
      <span className="font-bold text-blue-600">React</span>,&nbsp;
      <span className="font-bold text-blue-600">Vite</span>, and&nbsp;
      <span className="font-bold text-blue-600">Tailwind CSS</span> to create a responsive and efficient front-end experience.&nbsp;
    </p>
  </div>
  <div className="max-w-md">
    <p className="text-base font-normal text-gray-700 leading-6">
      By comparing the different data request methods, users can gain a better understanding of the performance characteristics of each method and choose the most appropriate one for their specific needs.&nbsp;
    </p>
  </div>
      <Apicall/>
    </div>
  )
}

export default App

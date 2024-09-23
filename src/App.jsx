import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (date, setter) => {
    setter(date);
  };

  return (
    <div className="App">
      <header>
        <h1>Patrimoine</h1>
      </header>
      <nav className="navbar">
        <ul>
          <li>Agrégat</li>
          <li>Trésorerie</li>
          <li>Immobilisations</li>
          <li>Obligations</li>
        </ul>
      </nav>
      <section className="inputs">
        <label>Date Start: </label>
        <DatePicker selected={startDate} onChange={(date) => handleDateChange(date, setStartDate)} />
        
        <label>Date End: </label>
        <DatePicker selected={endDate} onChange={(date) => handleDateChange(date, setEndDate)} />
      </section>
    </div>
  );
};

export default App;

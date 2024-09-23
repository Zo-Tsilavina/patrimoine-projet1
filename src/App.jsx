import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const mockData = {
  fluxImpossibles : [
    { date: '2024-07-10', description: 'Myriade Fr', value: -5 },
    { date: '2024-07-11', description: 'Cresus & Cesar', value: -10 },
    { date: '2024-07-12', description: 'Myriade Fr', value: -15 },
    { date: '2024-09-23', description: 'Cresus & Cesar', value: -20 },
    { date: '2024-09-30', description: 'Myriade Fr', value: -25 },
  ],

  fluxJournaliers : [
    { date: '2024-07-10', description: 'Daily Flux', value: 100 },
    { date: '2024-07-11', description: 'Daily Flux', value: 120 },
    { date: '2024-07-12', description: 'Daily Flux', value: 140 },
    { date: '2024-09-23', description: 'Daily Flux', value: 160 },
    { date: '2024-09-30', description: 'Daily Flux', value: 180 },
  ],

  graphData : [
    { date: '2024-07-10', fluxJournalier: 100, fluxImpossible: -5 },
    { date: '2024-07-11', fluxJournalier: 120, fluxImpossible: -10 },
    { date: '2024-07-12', fluxJournalier: 140, fluxImpossible: -15 },
    { date: '2024-09-23', fluxJournalier: 160, fluxImpossible: -20 },
    { date: '2024-09-27', fluxJournalier: 190, fluxImpossible: -30 },
    { date: '2024-09-30', fluxJournalier: 180, fluxImpossible: -25 },
  ],

  patrimoineData: [
    { date: '2024-07-10', possesseur: 'Jean Dupont', argent: 5000, dette: 2000 },
    { date: '2024-07-11', possesseur: 'Marie Curie', argent: 10000, dette: 3000 },
    { date: '2024-07-12', possesseur: 'Albert Einstein', argent: 7500, dette: 1500 },
    { date: '2024-09-23', possesseur: 'Isaac Newton', argent: 12000, dette: 5000 },
    { date: '2024-09-30', possesseur: 'Galileo Galilei', argent: 8000, dette: 1000 },
  ],
};

const App = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [fluxImpossibles, setFluxImpossibles] = useState([]);
  const [fluxJournaliers, setFluxJournaliers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [patrimoineData, setPatrimoineData] = useState([]);

  const handleDateChange = (date, setter) => {
    setter(date);
  };

  const handleSearch = () => {
    const filteredFluxImpossibles = mockData.fluxImpossibles
      .filter(flux => {
        const fluxDate = new Date(flux.date);
        return fluxDate >= startDate && fluxDate <= endDate;
      })
      .map(flux => flux.value);

    const filteredFluxJournaliers = mockData.fluxJournaliers
      .filter(flux => {
        const fluxDate = new Date(flux.date);
        return fluxDate >= startDate && fluxDate <= endDate;
      })
      .map(flux => flux.value);

    // Filtrer les données du graphique
    const filteredGraphData = mockData.graphData.filter(d => {
      const graphDate = new Date(d.date);
      return graphDate >= startDate && graphDate <= endDate;
    });

    const filteredPatrimoineData = mockData.patrimoineData.filter(d => {
      const patrimoineDate = new Date(d.date);
      return patrimoineDate >= startDate && patrimoineDate <= endDate;
    });

    // Mettez à jour chartData pour inclure argent et dette
    const patrimoineByDate = Object.fromEntries(filteredPatrimoineData.map(d => [d.date, { argent: d.argent, dette: d.dette }]));
    const updatedChartData = filteredGraphData.map(d => ({
      ...d,
      argent: patrimoineByDate[d.date]?.argent || 0,
      dette: patrimoineByDate[d.date]?.dette || 0,
    }));

    setFluxImpossibles(filteredFluxImpossibles.length > 0 ? filteredFluxImpossibles.join(', ') : "Aucun flux impossible trouvé");
    setFluxJournaliers(filteredFluxJournaliers.length > 0 ? filteredFluxJournaliers.join(', ') : "Aucun flux journalier trouvé");
    setChartData(updatedChartData);
    setPatrimoineData(filteredPatrimoineData);
};

  return (
    <div className="App">
      <div>
        <header>
          <h1>Patrimoine</h1>
        </header>
        <nav className="navbar">
          <ul>
            <li>
              <input type="checkbox" />Agrégat
            </li>
            <li>
              <input type="checkbox"/>Trésorerie 
            </li>
            <li>
              <input type="checkbox"/>Immobilisations
            </li>
            <li>
              <input type="checkbox"/>Obligations
            </li>
          </ul>
        </nav>
        <section className="inputs">
          <label>Date de début: </label>
          <DatePicker selected={startDate} onChange={(date) => handleDateChange(date, setStartDate)} />
          
          <label>Date de fin: </label>
          <DatePicker selected={endDate} onChange={(date) => handleDateChange(date, setEndDate)} />

          <button onClick={handleSearch}>Rechercher</button>
        </section>
      </div>
      
      <div>
        <section className="outputs">
          <div>
            <h3>Flux Impossibles</h3>
            <p>{fluxImpossibles}</p> {/* Affichage dynamique des flux impossibles */}
          </div>
          <div>
            <h3>Flux Journaliers</h3>
            <p>{fluxJournaliers}</p> {/* Affichage dynamique des flux journaliers */}
          </div>
          <div>
            <ul>
              {patrimoineData.map((data, index) => (
                <li key={index}>
                  {data.date} - {data.possesseur}: Argent: {data.argent}€, Dette: {data.dette}€
                </li>
              ))}
            </ul>
          </div>
        </section>
        
        <section className="graph">
          <h2>Graphique</h2>
          <ResponsiveContainer width="100%" height={400}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="fluxJournalier" stroke="#8884d8" activeDot={{ r: 8 }} />
    <Line type="monotone" dataKey="fluxImpossible" stroke="#82ca9d" />
    <Line type="monotone" dataKey="argent" stroke="#ff7300" />
    <Line type="monotone" dataKey="dette" stroke="#ff0000" />
  </LineChart>
</ResponsiveContainer>
        </section>
      </div>
    </div>
  );
};

export default App;

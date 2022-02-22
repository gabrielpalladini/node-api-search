import React, { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from './components/search.tsx';

function App() {
  const [dataAPI, setDataAPI] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();
        setDataAPI(data);
      } catch (error) {
      }
    };
    fetchData();
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        {dataAPI?.companies && <SearchBar data={dataAPI?.companies} />}
      </header>
    </div>
  );
}

export default App;

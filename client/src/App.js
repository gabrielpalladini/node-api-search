import React, { useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from './components/search.tsx';
import styled from "@emotion/styled";

function App() {
  const [dataAPI, setDataAPI] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        const data = await response.json();
        console.log('data', data);
        setDataAPI(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchData();
    console.log('data2', dataAPI);
  }, []);

  useEffect(() => {
    console.log('The console is', dataAPI?.companies)}, [])

  return (
    <div className="App">
      <header className="App-header">
        {dataAPI?.companies && <SearchBar data={dataAPI?.companies} />}
      </header>
    </div>
  );
}


const ListOfCompanies = styled.div`
  display: flex;
  
  
  div {
    padding: 0 15px;
  }
  
  img {
    width: 25px;
  }
`;

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ENDPOINT = "/graphql";

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const payload = {
      query: `{
        hello
      }`
    };

    axios.post(ENDPOINT, payload)
      .then(res => {
        setResponse(res.data.data.hello);
      });
  }, []);

  return (
    <div className="App">
      {response}
    </div>
  );
}

export default App;

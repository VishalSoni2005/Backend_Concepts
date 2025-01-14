import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/name')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        setError('Failed to fetch data');
        console.error(err);
      });
  }, []); // Added empty dependency array to ensure the effect runs once on mount.

  return (
    <div>
      <h1>Building First Full Stack App</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          <p>{`Total Data: ${data.length}`}</p>
          {data.map((item, idx) => (
            <div key={idx}>
              <h3>{item.app_name}</h3>
              <p>{item.car_model}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface Car {
  app_name: string;
  car_model: string;
}

function App() {
  const [cars, setCar] = useState<Car[]>([]);

  // Add the empty dependency array to run the effect only once when the component mounts
  useEffect(() => {
    axios
      // .get('http://localhost:3000/api/tellme')
      .get('/api/tellme')
      .then(response => {
        setCar(response.data);
      })
      .catch(error => {
        alert(error);
      });
  }, []); // <-- Add the empty dependency array here

  return (
    <div>
      <h1>Building first full stack app</h1>
      <p>Total cars are: {cars.length}</p> {/* Fixed typo from ${} to {} */}
      {cars.map((car, idx) => (
        <div key={idx}>
          <h3>{car.app_name}</h3>
          <p>{car.car_model}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

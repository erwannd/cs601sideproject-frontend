import './App.css'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const text = "two dogs";

  useEffect(() => {
    // localhost:8080/api/search/text?text="two dogs"
    axios.get(`http://localhost:8080/api/search/text?text=${text}`)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Images</h2>
      <ul>
        {images.map(img => (
          <li key={img.id}>
            {img.title} (id: {img.id}) (url: {img.url}) (score: {img.score})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
import './App.css'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // this is what the response look like, its an array of json objects
  const sample_response = [
    {
        "id": 453048561840424662,
        "title": "two_dogs.jpg",
        "url": "https://rossandrewimageholder.s3.us-east-2.amazonaws.com/dc3eab19-e1ca-40bc-a08a-2ac6f315daa2.jpg",
        "score": 0.47542438
    },
    {
        "id": 453048561840424666,
        "title": "two-dogs-sitting-snow.jpg",
        "url": "https://rossandrewimageholder.s3.us-east-2.amazonaws.com/0d1dc5d2-a79c-46fb-a23b-7963cd569756.jpg",
        "score": 0.4417174
    },
    {
        "id": 453048561840424664,
        "title": "two_dogs1.jpg",
        "url": "https://rossandrewimageholder.s3.us-east-2.amazonaws.com/bd2f18af-51ff-4d79-be24-d7e3977c1c88.jpg",
        "score": 0.3972207
    }
  ]

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
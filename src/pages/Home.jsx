import { useState, useEffect } from 'react';
import ImageCollection from './ImageCollection';
import axios from 'axios';

const Home = ({ userId }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) return;

      try {
        const response = await axios.get('http://localhost:8080/api/recommendation/id', {
          params: { userId: userId },
        });

        if (response.status === 200) {
          setResults(response.data);
          setError('');
        } else {
          setError('Failed to query images.');
        }
      } catch (error) {
        console.log(error);
        setError('An error occurred while querying images.');
      }
    };

    fetchImages();
  }, [userId]);


  const renderResults = () => {
    return <ImageCollection images={results} />;
  };

  return (
    <div className="text-search-container">
      {error && <p className="error-message">{error}</p>}
      {renderResults()}
    </div>
  );
};

export default Home;
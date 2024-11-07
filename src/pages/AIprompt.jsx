import React, { useState } from 'react';
import axios from 'axios';
import ImageCollection from './ImageCollection';

const AIprompt = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!query) {
          setError('Please provide a query.');
          return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/openai/genImage',
                { prompt: query }, 
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
      
            if (response.status === 200) {
                setResults([{ url: response.data, title: "Generated Image" }]);
                setError('');
            } else {
              setError('Failed to generate images.');
            }
          } catch (error) {
            console.log(error);
            setError('An error occurred while generate images.');
          }
        };

        const renderResults = () => {
    return <ImageCollection images={results} />;
  };

  return (
    <div className="text-search-container">
      <form className="text-query-form" onSubmit={handleSubmit}>
        <label htmlFor="text-query">Enter a prompt to generate desired images:</label>
        <input
          type="text"
          id="text-query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'sunset'"
        />
        <button type="submit">Generate</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <>{renderResults()}</>
    </div>
  );
}
export default AIprompt
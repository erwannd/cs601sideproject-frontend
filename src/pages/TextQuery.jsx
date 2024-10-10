// const handleSearch = () => {
//     if (!searchQuery) {
//         alert('Please enter a search query.');
//         return;
//     }
//
//     fetch(`http://localhost:8080/api/search?text=${encodeURIComponent(searchQuery)}`)
//         .then((response) => response.json())
//         .then((data) => {
//             setSearchResults(data);
//         })
//         .catch((error) => {
//             console.error('Search error:', error);
//         });
// };

import React, { useState } from 'react';
import axios from 'axios';
import ImageCollection from './ImageCollection';

const TextQuery = () => {
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
            const response = await axios.get('http://localhost:8080/api/search/text', {
                params: {text: query},
            });

            if (response.status === 200) {
                setResults(response.data);
                setError('');
            } else {
                setError('Failed to fetch similar images.');
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred while fetching similar images.');
        }
    };

    const renderResults = () => {
        return <ImageCollection images={results}/>;
    };

    return (
        <div className="text-search-container">
            <form className="text-query-form" onSumbit={handleSubmit}>
                <label htmlFor="text-query">Enter a text query to find similar images:</label>
                <input
                    type="text"
                    id="text-query"
                    name="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., 'sunset'"
                />
                <button type="submit">Search</button>

            </form>
            {error && <p className="error-message">{error}</p>}
            <>{renderResults()}</>
        </div>
    );

};

export default TextQuery;
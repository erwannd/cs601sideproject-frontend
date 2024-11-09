import React, { useState } from 'react';
import axios from 'axios';
import ImageCollection from './ImageCollection';
import TagSelection from "../components/TagSelection";

const AIprompt = ({token}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);


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
                console.log(response.data)
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

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!results) {
      setUploadStatus("No file seleteced");
      return;
    }

    try {
      const formData = new FormData();
      const imgTags = { tags: selectedTags };

      
      formData.append(
        "tags",
        new Blob([JSON.stringify(imgTags)], {
          type: "application/json",
        })
      );
      formData.append("URL", results[0].url);
      console.log(results[0].url)

      const response = await axios.post(
        "http://localhost:8080/api/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus("Image uploaded successfully");
        alert("Image uploaded successfully");
      } else {
        setUploadStatus("Image upload failed");
      }
    } catch (err) {
      console.log(err);
      console.log("token: " + token);
      setUploadStatus("Error encountered during upload");
    }
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
      <div className="button-group" style={{ display: 'flex', gap: '10px' }}>
          <button type="submit">Generate</button>
          <TagSelection setSelectedTags={setSelectedTags} />
          <button type="submit" onClick={handleImageUpload}>Upload</button>
     </div>
     
    </form>
    {error && <p className="error-message">{error}</p>}
    <>{renderResults()}</>
  </div>
  );
}
export default AIprompt
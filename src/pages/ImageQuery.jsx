import React, { useState } from 'react';
import axios from 'axios';
import ImageCollection from './ImageCollection';

const ImageQuery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');


  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) {
      setError('Please upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);
    
    try {
      const response = await axios.post('http://localhost:8080/api/search/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    return <ImageCollection images={results}/>
  };

  return (
    <div className="image-search-container">
      <form className="image-upload-form" onSubmit={handleSubmit}>
        <label htmlFor="image-upload">Upload an image to discover similar images</label>
        <input
          type="file"
          id="image-upload"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <>{renderResults()}</>
    </div>
  );
};

export default ImageQuery;
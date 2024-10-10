import React, { useState } from 'react';

function App() {
  // State for the image file, status, search query, and search results
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission (uploading the image)
  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:8080/api/upload', {
      method: 'POST',
      body: formData,
    })
        .then((response) => response.text())
        .then((data) => {
          setStatus(data);
        })
        .catch((error) => {
          setStatus('Error during upload.');
          console.error('Upload error:', error);
        });
  };

  // Handle search query submission
  const handleSearch = () => {
    if (!searchQuery) {
      alert('Please enter a search query.');
      return;
    }

    fetch(`http://localhost:8080/api/search?text=${encodeURIComponent(searchQuery)}`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error('Search error:', error);
        });
  };

  return (
      <div className="App">
        <h1>Upload an Image</h1>

        <form onSubmit={handleUpload}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Upload Image</button>
        </form>

        <p>{status}</p>

        <h2>Search by Text</h2>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search text"
        />
        <button onClick={handleSearch}>Search</button>

        <div id="searchResults">
          {searchResults.length > 0 ? (
              searchResults.map((result) => (
                  <div key={result.id}>
                    <p>
                      <strong>Title:</strong> {result.title}
                    </p>
                    <p>
                      <strong>Score:</strong> {result.score}
                    </p>
                    <p>
                      <strong>Image:</strong>
                    </p>
                    <img
                        src={result.url}
                        alt={result.title}
                        style={{ maxWidth: '300px', height: 'auto' }}
                    />
                    <hr />
                  </div>
              ))
          ) : (
              <p>No results found.</p>
          )}
        </div>
      </div>
  );
}

export default App;

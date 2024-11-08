import React, { useState } from "react";
import axios from "axios";
import ImageCollection from "./ImageCollection";
import ImageModal from "../components/ImageModal";

const TextQuery = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [selectedImgId, setSelectedImgId] = useState(null);

  const openImgModal = (imageId) => {
    setSelectedImgId(imageId);
    setIsImgModalOpen(true);
    console.log(imageId);
    console.log(`open: ${isImgModalOpen}`);
  };

  const closeImgModal = () => {
    setIsImgModalOpen(false);
    setSelectedImgId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query) {
      setError("Please provide a query.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8080/api/search/text",
        {
          params: { text: query },
        }
      );

      if (response.status === 200) {
        setResults(response.data);
        setError("");
      } else {
        setError("Failed to fetch similar images.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching similar images.");
    }
  };

  return (
    <div className="text-search-container">
      <form className="text-query-form" onSubmit={handleSubmit}>
        <label htmlFor="text-query">
          Enter a text query to find similar images:
        </label>
        <input
          type="text"
          id="text-query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'dog'"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="image-collection">
        <ImageCollection images={results} onImgClick={openImgModal} />
        <ImageModal
          imageId={selectedImgId}
          isOpen={isImgModalOpen}
          onClose={closeImgModal}
        />
      </div>
    </div>
  );
};

export default TextQuery;

import React, { useState } from "react";
import axios from "axios";
import TagSelection from "../components/TagSelection";
import "./AIprompt.css";

const AIprompt = ({ token }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!query) {
      setError("Please provide a query.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/openai/genImage",
        { prompt: query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setResults(response.data);
        console.log(response.data);
        setError("");
      } else {
        setError("Failed to generate images.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while generate images.");
    }
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
      formData.append("URL", results);

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
      setUploadStatus("Error encountered during upload");
    }
  };

  return (
    <div className="ai-prompt-container">
      <div className="text-search-container">
        <form className="text-query-form" onSubmit={handleSubmit}>
          <label htmlFor="text-query">
            Enter a prompt to generate desired images:
          </label>
          <input
            type="text"
            id="text-query"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="sunset"
          />
          <button type="submit">Generate</button>
          {results && (
            <div>
              <TagSelection setSelectedTags={setSelectedTags} />
              <button type="button" onClick={handleImageUpload}>
                Upload
              </button>
            </div>
          )}
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      {results && (
        <div className="image-preview">
          <img src={results} alt="Generated image" />
        </div>
      )}
    </div>
  );
};

export default AIprompt;

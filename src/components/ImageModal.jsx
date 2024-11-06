import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./ImageModal.css";

const ImageModal = ({ imageId, isOpen, onClose }) => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && imageId) {
      // fetch image metadata from Milvus
      const fetchImageMetadata = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:8080/api/images/imageid`,
            {
              params: { id: imageId },
            }
          );
          setImageData(response.data);
          setError("");
        } catch (err) {
          console.error("Error fetching image metadata:", err);
          setError("An error occurred while fetching image metadata.");
          setImageData(null);
        } finally {
          setLoading(false);
        }
      };
      fetchImageMetadata();
    }
  }, [imageId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="img-modal-overlay" onClick={onClose}>
      <div className="img-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-btn">
          ×
        </button>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {imageData && (
          <div>
            <p>id: {imageData.id}</p>
            <p>title: {imageData.title}</p>
            <p>uploaded by: {imageData.ownerId}</p>
            <p>url: {imageData.url}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;

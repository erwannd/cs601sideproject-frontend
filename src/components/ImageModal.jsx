import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import "./ImageModal.css";

const ImageModal = ({ imageId, isOpen, onClose }) => {
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ownerData, setOwnerData] = useState(null);

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

          if (response.status === 200) {
            setImageData(response.data);
            setError("");
          } else {
            setError("Failed to fetch image metadata.");
          }
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

  useEffect(() => {
    if (imageData?.ownerId) {
      // fetch owner data based on ownerId
      const fetchOwnerData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/users/${imageData.ownerId}`
          );

          if (response.status === 200) {
            setOwnerData(response.data);
            setError("");
          } else {
            setError("Failed to fetch owner data.");
          }
        } catch (err) {
          console.error("Error fetching owner data:", err);
          setError("An error occurred while fetching owner data.");
          setOwnerData(null);
        }
      };

      fetchOwnerData();
    }
  }, [imageData]);

  if (!isOpen) return null;

  return (
    <div className="img-modal-overlay" onClick={onClose}>
      <div className="img-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-btn">
          ×
        </button>
        {error && <p className="error-message">{error}</p>}
        {imageData && (
          <div>
            <div className="owner-info">
              {ownerData && (
                <Link to={`/user/${ownerData.userId}`} className="owner-link">
                  {ownerData.profilePictureUrl && (
                    <img
                      src={ownerData.profilePictureUrl}
                      alt={`${ownerData.userName}'s profile`}
                      className="profile-picture"
                    />
                  )}
                  <span>{ownerData.userName}</span>
                </Link>
              )}
            </div>
            <p>id: {imageData.id}</p>
            <p>title: {imageData.title}</p>
            <img className="img-content" src={imageData.url} alt="Preview" />
            <p>
              tags:{""}
              {imageData.tags.map((item, index) => (
                <span key={index} className="tag">
                  {item}
                </span>
              ))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;

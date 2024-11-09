import { useState, useEffect } from "react";
import ImageCollection from "./ImageCollection";
import ImageModal from "../components/ImageModal";
import axios from "axios";

const Home = ({ userId }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [selectedImgId, setSelectedImgId] = useState(null);

  const openImgModal = (imageId) => {
    setSelectedImgId(imageId);
    setIsImgModalOpen(true);
    console.log(imageId);
  };

  const closeImgModal = () => {
    setIsImgModalOpen(false);
    setSelectedImgId(null);
  };

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          "http://localhost:8080/api/recommendation/id",
          {
            params: { userId: userId },
          }
        );

        if (response.status === 200) {
          setResults(response.data);
          setError("");
        } else {
          setError("Failed to query images.");
        }
      } catch (error) {
        console.log(error);
        setError("An error occurred while querying images.");
      }
    };

    fetchImages();
  }, [userId]);

  const renderResults = () => {
    return <ImageCollection images={results} onImgClick={openImgModal} />;
  };

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      {renderResults()}
      <ImageModal
        imageId={selectedImgId}
        isOpen={isImgModalOpen}
        onClose={closeImgModal}
      />
    </>
  );
};

export default Home;

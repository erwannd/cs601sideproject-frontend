import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseProfile from "../assets/base_profile.png";
import "./Profile.css";
import "../components/ProfileUpdateModal";
import ImageCollection from "./ImageCollection";
import ImageModal from "../components/ImageModal";
import ProfileUpdateModal from "../components/ProfileUpdateModal";

const Profile = ({ token, userId, isLoggedIn }) => {
  const { id } = useParams(); // ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const [images, setImages] = useState([]);
  const [isImgModalOpen, setIsImgModalOpen] = useState(false);
  const [selectedImgId, setSelectedImgId] = useState(null);

  // function to fetch user info
  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/${id}`);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(
        err.response ? err.response.data : "Failed to fetch user profile"
      );
      setLoading(false);
    }
  };

  // function to fetch user images
  const fetchImages = async () => {
    if (!userId) return;

    try {
      const response = await axios.get("http://localhost:8080/api/images/id", {
        params: { userId: id },
      });

      if (response.status === 200) {
        setImages(response.data);
        setError("");
      } else {
        setError("Failed to query images.");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred while querying images.");
    }
  };

  useEffect(() => {
    fetchUser();
    console.log(token);
  }, [id]);

  const openModal = () => {
    setIsUserModalOpen(true);
  };

  const closeModal = () => {
    setIsUserModalOpen(false);
  };

  const openImgModal = (imageId) => {
    setSelectedImgId(imageId);
    setIsImgModalOpen(true);
  };

  const closeImgModal = () => {
    setIsImgModalOpen(false);
    setSelectedImgId(null);
  };

  useEffect(() => {
    fetchImages();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const isOwnProfile = id === userId;

  return (
    <div className="profile-container">
      <div className="sidebar">
        <div className="profile-image-container">
          <img
            className="profile-image"
            src={user.profilePictureUrl || baseProfile}
            alt={`${user.userName}'s profile`}
          />
        </div>
        <div className="profile-info">
          {isOwnProfile ? (
            <>
              <h1>Your profile</h1>
              <p>Email: {user.email}</p>
              <p>Username: {user.userName}</p>
              <p>Created: {user.joinedDate}</p>
              <button onClick={openModal}>Edit Profile</button>

              {isUserModalOpen && (
                <ProfileUpdateModal
                  token={token}
                  user={user}
                  closeModal={() => {
                    closeModal();
                    fetchUser();
                  }}
                />
              )}
            </>
          ) : (
            <h1>{user.userName}'s Profile</h1>
          )}
        </div>
        <div className="additional-content"></div>
      </div>
      <div className="image-collection">
        <ImageCollection images={images} onImgClick={openImgModal} />
        <ImageModal
          imageId={selectedImgId}
          isOpen={isImgModalOpen}
          onClose={closeImgModal}
        />
      </div>
    </div>
  );
};

export default Profile;

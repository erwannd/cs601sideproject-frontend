import React, { useState } from "react";
import axios from "axios";
import "./ProfileUpdateModal.css";

const ProfileUpdateModal = ({ token, user, closeModal }) => {
  const [userName, setUserName] = useState(user.userName);
  const [profileImage, setProfileImage] = useState(null);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "userInfo",
      new Blob(
        [
          JSON.stringify({
            userId: user.userId,
            userName: userName,
            profilePictureUrl: "",
          }),
        ],
        {
          type: "application/json",
        }
      )
    );

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.patch(
        "http://localhost:8080/users/profile/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Profile updated successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile</h2>
        <button className="modal-close-button" onClick={closeModal}>
          ×
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
              required
              className="input-large"
            />
          </div>
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image:</label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="input-large"
            />
            {/* {user.profilePictureUrl && !profileImage && (
              <div className="profile-image-container">
                <img
                  src={user.profilePictureUrl}
                  alt="Profile Image"
                  className="profile-image"
                />
              </div>
            )} */}
          </div>
          <button type="submit" className="submit-button">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;

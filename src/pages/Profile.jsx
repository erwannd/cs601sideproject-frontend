import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
  const [friends, setFriends] = useState(null);
  const [isFriend, setIsFriend] = useState(false);

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
    } catch (err) {
      console.log(err);
      setError("An error occurred while querying images");
    }
  };

  const fetchFriendList = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/users/friends`, {
        params: { userId: userId },
      });

      if (response.status === 200) {
        setFriends(response.data);
        setIsFriend(response.data.some((friend) => friend.userId === id));
        setError("");
      } else {
        setError("Failed to fetch friends list");
      }
    } catch (err) {
      console.log(err);
      setError("An error occurred while fetching friends list");
    }
  };

  // function to add friend
  const handleAddFriend = async () => {
    try {
      await axios.post(`http://localhost:8080/users/friends`, null, {
        params: { userId: userId, friendId: id },
      });
      setIsFriend(true);
    } catch (err) {
      console.log(err);
      setError("Failed to add friend");
    }
  };

  // function to remove friend
  const handleRemoveFriend = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/friends`, {
        params: { userId: userId, friendId: id },
      });
      setIsFriend(false);
    } catch (err) {
      console.log(err);
      setError("Failed to remove friend");
    }
  };

  useEffect(() => {
    fetchUser();
    // console.log(token);
  }, [id]);

  useEffect(() => {
    fetchImages();
  }, [id, userId]);

  useEffect(() => {
    fetchFriendList();
  }, [id, userId]);

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
        <div className="additional-content">
          {isOwnProfile ? (
            <div className="friends-list">
              <h3>Your Friends</h3>
              {friends && friends.length > 0 ? (
                <>
                  {friends.map((friend) => (
                    <Link to={`/user/${friend.userId}`} className="owner-link">
                      <div className="friend-item">
                        <img
                          src={friend.profilePictureUrl || baseProfile}
                          alt={`${friend.userName}'s profile`}
                          className="profile-picture"
                        />
                        <p>{friend.userName}</p>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <p>You have no friends added yet.</p>
              )}
            </div>
          ) : (
            <>
              {isLoggedIn && (
                <button
                  onClick={isFriend ? handleRemoveFriend : handleAddFriend}
                >
                  {isFriend ? "Remove Friend" : "Add Friend"}
                </button>
              )}
            </>
          )}
        </div>
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

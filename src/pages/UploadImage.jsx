import axios from 'axios';
import React, { useState } from 'react';
import TagSelection from '../components/TagSelection';

const UploadImage = ({ token }) => {
  const [imgFile, setImgFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleImageUpload = async (e) => {
    e.preventDefault();

    if (!imgFile) {
      setUploadStatus("No file seleteced");
      return;
    }

    try {
      const formData = new FormData();
      const imgTags = { "tags": selectedTags };

      formData.append("image", imgFile);
      formData.append("tags", new Blob([JSON.stringify(imgTags)], {
        type: "application/json"
      }));

      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.status === 200) {
        setUploadStatus("Image uploaded successfully");
      } else {
        setUploadStatus("Image upload failed");
      }
    } catch (err) {
      console.log(err);
      console.log("token: " + token);
      setUploadStatus("Error encountered during upload");
    }
  }

  return (
    <div>
      <h2>Upload Image</h2>
      <form onSubmit={handleImageUpload}>
        <input
          type="file"
          onChange={(e) => setImgFile(e.target.files[0])}
        />
        <TagSelection setSelectedTags={setSelectedTags}/>
        <button type='submit'>Submit</button>
      </form>
      <p>{uploadStatus}</p>
    </div>
  )
};

export default UploadImage;
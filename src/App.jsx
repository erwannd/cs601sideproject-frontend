import './App.css'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/NavBar";
import Home from './pages/Home';
import Login from "./pages/Login";
import Register from './pages/Register';
import ImageQuery from "./pages/ImageQuery";
import TextQuery from "./pages/TextQuery";

function App() {
  // this is what the response look like, its an array of json objects
  

  return (
    <div className="App">
      <NavBar />
      <div className='main-container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findbytext" element={<TextQuery />} />
          <Route path="/findbyimage" element={<ImageQuery />} /> 
        </Routes>
      </div>
    </div>
  );

  // const [images, setImages] = useState([]);
  // const text = "two dogs";

  // useEffect(() => {
  //   // localhost:8080/api/search/text?text="two dogs"
  //   axios.get(`http://localhost:8080/api/search/text?text=${text}`)
  //     .then(response => {
  //       setImages(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // return (
  //   <div>
  //     <h2>Images</h2>
  //     <ul>
  //       {images.map(img => (
  //         <li key={img.id}>
  //           {img.title} (id: {img.id}) (url: {img.url}) (score: {img.score})
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}

export default App;
import React, { useEffect } from "react";
import axios from "axios";

function Tryout() {
  useEffect(() => {
    // Without Axios
    // const fetchImages = async () => {
    //   try {
    //     const response = await fetch(
    //       "http://localhost:8080/api/images/id?userId=c0ilWp4FB9YBuXBAgyiDowmfZNk2"
    //     );
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     console.log(data);
    //   } catch (error) {
    //     console.error("Error fetching images:", error);
    //   }
    // };

    // With Axios
    // localhost:8080/api/images/id?userId=c0ilWp4FB9YBuXBAgyiDowmfZNk2
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/images/id",
          {
            params: {
              userId: "c0ilWp4FB9YBuXBAgyiDowmfZNk2",
            },
          }
        );
        console.log(response.data);
        console.log(453232024350051641);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <h1>Image Search by User ID</h1>
      <p>Check the console for the response data.</p>
    </div>
  );
}

export default Tryout;

import "./ImageCollection.css";

const ImageCollection = ({ images }) => {
  return (
    <div className="images-container">
      {images.map((image, index) => (
        <div key={index} className="image-div">
          {console.log(image)}
          <img src={image.url} alt={image.id} />
        </div>
      ))}
    </div>
  );
};

export default ImageCollection;

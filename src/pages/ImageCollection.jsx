import "./ImageCollection.css";

const ImageCollection = ({ images, onImgClick }) => {
  return (
    <div className="images-container">
      {images.map((image, index) => (
        <div key={index} className="image-div">
          <img
            src={image.url}
            alt={image.id}
            onClick={() => {
              onImgClick(image.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCollection;

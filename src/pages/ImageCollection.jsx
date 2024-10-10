import "./ImageCollection.css";

const ImageCollection = ({ images }) => {
    return (
        <div className="images-container">
            {images.map((image, index) => (
                <div key={index} className="image-div">
                    <img src={image.url} alt={image.title}/>
                </div>
            ))}
        </div>
    )
}

export default ImageCollection;
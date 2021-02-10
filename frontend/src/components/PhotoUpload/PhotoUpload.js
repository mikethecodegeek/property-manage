import React from 'react';
import ImageUploading from 'react-images-uploading';
 
function ImageUpload({onNewImageBase64}) {
  const [images, setImages] = React.useState([]);
 
  const onChange = (imageList, addUpdateIndex) => {

    setImages(imageList);
    if (imageList[0]) {
        onNewImageBase64(imageList[0].data_url)
    } else {
        onNewImageBase64(null)
    }
  };

  return (
    <div>
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          
          <div className="upload__image-wrapper">
            {!images[0] &&
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload Image
            </button>
          }
            &nbsp; {/* html encoded space character / HTML Entity*/}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                {/* <img src={image['data_url']} alt="" width="100" /> */}
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>

    </div>
  );
}

export default ImageUpload
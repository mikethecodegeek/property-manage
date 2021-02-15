import React, {useEffect} from 'react';
import ImageUploading from 'react-images-uploading';
 
function ImageUpload({onNewImageBase64, onSave, currentPhoto}) {
  const [images, setImages] = React.useState([]);
 
  const onChange = (imageList, addUpdateIndex) => {

    setImages(imageList);
    if (imageList[0]) {
        onNewImageBase64(imageList[0].data_url)
    } else {
        onNewImageBase64(null)
    }
  };
  useEffect(()=>{
    if (images.length == 0) {
      onNewImageBase64(null)
    }
  },[images])

  const saveImg = (remove, imageList) => {
    // console.log(images[0].data_url)
    // return
    onSave(images[0].data_url)
    setImages([])
    // remove(0)
    // imageList[0] = null
  }

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
              className='form-button'
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
                  <button className='form-button' onClick={() => onImageUpdate(index)}>Update</button>
                  <button className="form-button" onClick={() => onImageRemove(index)}>Remove</button>
                  <button className='form-button' onClick={() => saveImg((index)=>onImageRemove(index))}>Save</button>
                  
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
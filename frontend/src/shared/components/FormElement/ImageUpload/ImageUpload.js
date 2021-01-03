import React, { useState, useEffect, useRef } from "react";
import Button from "../../UI/Button/Button";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const fileRef = useRef();
  const [file, setFile] = useState(props.initialValue || null);
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!file) {
      return;
    }

    if (typeof props.initialValue === "string") {
      setPreviewUrl(`http://localhost:5000/${props.initialValue}`);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file, props.initialValue]);

  const pickedImageHandler = (event) => {
    let file, fileIsValid;
    if (event.target.files && event.target.files.length === 1) {
      file = event.target.files[0];
      setFile(file);
      fileIsValid = true;
    } else {
      fileIsValid = false;
    }

    props.onInput(props.id, file, fileIsValid, props.typeForm);
  };

  const pickedFileHandler = () => {
    fileRef.current.click();
  };

  let imageUpload = (
    <div className="image-upload">
      <input
        type="file"
        ref={fileRef}
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
        onChange={pickedImageHandler}
      />
      {!props.isAvatar && (
        <div className="image-upload__recipe">
          <Button type="button" fillSmall onClick={pickedFileHandler}>
            Pick Image
          </Button>
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
      )}
      {props.isAvatar && (
        <div className="image-upload__avatar">
          {previewUrl && (
            <div>
              <img src={previewUrl} alt="Preview" />
              <Button type="button" fillSmall onClick={pickedFileHandler}>
                Pick Image
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return imageUpload;
};

export default ImageUpload;

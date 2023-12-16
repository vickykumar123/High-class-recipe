"use client";
import { useRef, useState } from "react";
import style from "./imagePicker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickImage, setPickImage] = useState();
  const imageInput = useRef();
  //   console.log(imageInput);

  function handleImageUpload() {
    imageInput.current.click();
  }

  function handleChange(event) {
    const image = event.target.files[0];
    if (!image) {
      setPickImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickImage(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }

  return (
    <div className={style.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={style.controls}>
        <div className={style.preview}>
          {!pickImage && <p>No image yet...</p>}
          {pickImage && <Image src={pickImage} alt="uploaded image" fill />}
        </div>
        <input
          className={style.input}
          type="file"
          accept="image/*"
          id={name}
          name={name}
          ref={imageInput}
          onChange={handleChange}
          required
        />
        <button
          className={style.button}
          type="button"
          onClick={handleImageUpload}
        >
          Upload the image
        </button>
      </div>
    </div>
  );
}

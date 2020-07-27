import React, { useState } from "react";

import { Button, Input } from "@material-ui/core/";

import firebase from "firebase";

import { storage, db } from "./firebase";

//
import "./ImageUpload.css";

function ImageUpload({username }) {
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState("");
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    // listen the event to update progress bar
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.log(error.message);
      },
      // complete
      () => {
        storage.ref("images").child(image.name).getDownloadURL().then(url=>{
          // post image url to database
          db.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: username
          });
          setCaption("");
          setImage(null);
          setProgress(0);
        });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload_progress" value={progress} max="100"/>  
      <input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input type="file" onClick={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;

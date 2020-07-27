import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

//
import { db } from "./firebase";
//
import Post from "./Post";

import "./App.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const [posts, setPosts] = useState([]);

  // For material-ui modal
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <h2>HHHHHHH</h2>
        </div>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        />
      </div>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      <h1>Hello</h1>
      {posts.map(({ id, post }) => (
        <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Input } from "@material-ui/core/";

//
import { db, auth } from "./firebase";
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

  const [username, setUserName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  // for auth
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser) {
        //user is logged in
        setUser(authUser);

        if(authUser.displayName)
        {

        }else{
          // if we just created someone
          return authUser.updateProfile({
            displayName: username
          })
        }
      }
      else{
        setUser(null);
      }
    })
    return () => unsubscribe();
  }, [user, username]);

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

  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser)=>{
        authUser.user.updateProfil({
          displayName: username
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <center>
            <img
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
              alt=""
            />
          </center>
          <form className="app__signup">
            <Input placeholder="username" type="text" value={username} onChange={(e) => setUserName(e.target.value)} />

            <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </form>
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

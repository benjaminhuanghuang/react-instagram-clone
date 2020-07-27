import React, { useState, useEffect } from "react";

//
import {db} from "./firebase";
//
import Post from "./Post";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    fetchPosts();
  }, []);

  const fetchPosts =  () =>
  {
    db.collection('posts').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>doc.data()));
    })
  }


  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png"
          alt=""
        />
      </div>
      <h1>Hello</h1>
      {posts.map((post) => (
        <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
      ))}
    </div>
  );
}

export default App;

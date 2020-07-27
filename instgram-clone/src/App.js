import React, { useState } from "react";

//
import Post from "./Post";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    {
      username: "ben",
      caption: "How are you",
      imageUrl: "https://www.amazon.com/images/G/01/img18/home/2019/Q1/LP/Coffee/desktop_02.jpg",
    },
    {
      username: "Lily",
      caption: "How are you",
      imageUrl: "https://www.amazon.com/images/G/01/img18/home/2019/Q1/LP/Coffee/desktop_03.jpg",
    },
    {
      username: "AAAA",
      caption: "How are you",
      imageUrl: "https://www.amazon.com/images/G/01/img18/home/2019/Q1/LP/Coffee/desktop_01.jpg",
    },
  ]);

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

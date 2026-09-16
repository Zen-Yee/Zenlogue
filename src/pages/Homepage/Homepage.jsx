import React from "react";
import "./Homepage.css";

import Hero from "./sections/Hero/Hero";
import Featured from "./sections/Featured/Featured";
import PostFeed from "./sections/PostFeed/PostFeed";

function Homepage() {
  return (
    <div className="home-page">
      <Hero />
      <Featured />
      <PostFeed />
    </div>
  );
}

export default Homepage;

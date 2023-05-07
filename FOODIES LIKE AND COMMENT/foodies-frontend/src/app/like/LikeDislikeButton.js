import React, { useState } from "react";
import { HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import "./LikeDislikeButton.css";

const LikeDislikeButton = ({ onLike, onDislike }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
    onLike();
  };

  const handleDislikeClick = () => {
    setLiked(false);
    onDislike();
  };

  return (
    <div className="container">
      <Button
        className="like-button"
        variant={liked ? "primary" : "outline-primary"}
        onClick={handleLikeClick}
      >
        <HandThumbsUp />
      </Button>{" "}
      <Button
        className="dislike-button"
        variant={!liked ? "danger" : "outline-danger"}
        onClick={handleDislikeClick}
      >
        <HandThumbsDown />
      </Button>
    </div>
  );
};

export default LikeDislikeButton;

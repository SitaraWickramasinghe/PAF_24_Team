import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CommentSection from "../comments/CommentSection";
import LikeDislikeButton from "../like/LikeDislikeButton";

const dummyPosts = [
  {
    id: 1,
    user: "Alice",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    likes: 11,
    dislikes: 5,
    comments: [],
    imageUrl:
      "https://images.unsplash.com/photo-1682700369793-55a5d4e63c2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=441&q=80",
  },
  {
    id: 2,
    user: "Bob",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 4,
    dislikes: 2,
    comments: [],
    imageUrl:
      "https://images.unsplash.com/photo-1682700372648-716472f422c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=405&q=80",
  },
];

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [likeCount, setLikeCount] = useState(post.likes);
  const [dislikeCount, setDislikeCount] = useState(post.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    post.comments.push({ user: "You", content: comment });
    setComment("");
  };

  useEffect(() => {
    setLikeCount(post.likes);
    setDislikeCount(post.dislikes);
  }, [post.likes, post.dislikes]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(likeCount + 1);
      post.likes += 1;
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
        post.dislikes -= 1;
      }
    } else {
      setLiked(false);
      setLikeCount(likeCount - 1);
      post.likes -= 1;
    }
  };

  const handleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setDislikeCount(dislikeCount + 1);
      post.dislikes += 1;
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
        post.likes -= 1;
      }
    } else {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
      post.dislikes -= 1;
    }
  };

  return (
    <Card className="my-3">
      <Card.Body>
        <Row>
          <Col md={2}>
            <Card.Title>{post.user}</Card.Title>
          </Col>
          <Col md={10}>
            <Card.Text>{post.content}</Card.Text>
          </Col>
        </Row>
        {post.imageUrl && (
          <Row>
            <Col md={12}>
              <Card.Img variant="top w-50 h-auto mb-2" src={post.imageUrl} />
            </Col>
          </Row>
        )}
        <Row>
          <Col md={2}>
            <LikeDislikeButton
              onLike={handleLike}
              onDislike={handleDislike}
              liked={liked}
              disliked={disliked}
            />
          </Col>
          <Col md={10}>
            <Card.Subtitle className="mb-2 text-muted">
              {likeCount} Likes, {dislikeCount} Dislikes
            </Card.Subtitle>
          </Col>
        </Row>
        <hr />
        <CommentSection comments={post.comments} />
        <hr />
      </Card.Body>
    </Card>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState(dummyPosts);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Posts;

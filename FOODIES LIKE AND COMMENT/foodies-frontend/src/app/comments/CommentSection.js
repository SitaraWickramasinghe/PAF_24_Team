import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, commentText]);
    setCommentText("");
  };

  const handleCommentDelete = (index) => {
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);
  };

  const handleCommentEdit = (index) => {
    const newCommentText = prompt("Edit comment", comments[index]);
    if (newCommentText) {
      const newComments = [...comments];
      newComments[index] = newCommentText;
      setComments(newComments);
    }
  };

  return (
    <div className="container m-0 p-0">
      <Form onSubmit={handleCommentSubmit}>
        <Form.Group controlId="comment">
          <Form.Control
            className="comment-input"
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={handleCommentChange}
          />
        </Form.Group>
        <Button className="comment-button" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <br />
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            {comment}{" "}
            <Button
              className="ml-5 delete-button rounded-circle"
              variant="danger"
              onClick={() => handleCommentDelete(index)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>{" "}
            <Button
              className="edit-button rounded-circle"
              variant="primary"
              onClick={() => handleCommentEdit(index)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentSection;

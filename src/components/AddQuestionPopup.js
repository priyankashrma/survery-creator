import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function AddQuestionPopup({
  show,
  setShow,
  questionsList,
  setQuestionsList,
  updateCurrentQuestions,
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleClose = () => setShow(false);

  const handleSubmit = () => {
    const temp = Array.from(questionsList);
    temp.push({
      id: temp.length ? `${temp[temp.length - 1].id + 1}` : "1",
      question,
      answer,
    });
    setQuestionsList(temp);
    updateCurrentQuestions();
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={handleClose}>
          <Modal.Title>Add New Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type the Question?"
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <Form.Select
                aria-label="Select Type of Input"
                onChange={(e) => setAnswer(e.target.value)}
              >
                <option>Select type of input</option>
                <option value="text">Text</option>
                <option value="select">Select</option>
                <option value="boolean">Boolean</option>
                <option value="multiple">Multiple Choice</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddQuestionPopup;


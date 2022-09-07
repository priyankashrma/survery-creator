import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap";
import AddQuestionPopup from "../components/AddQuestionPopup";
import Pagination from "../components/Pagination";

const Home = ({ data }) => {
  const [show, setShow] = useState(false);
  const [questionsList, setQuestionsList] = useState();
  const [currentQuestions, setCurrentQuestions] = useState();

  const questionsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

  useEffect(() => {
    setQuestionsList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (questionsList)
      setCurrentQuestions(
        questionsList.slice(indexOfFirstQuestion, indexOfLastQuestion)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsList, currentPage]);

  function moveUp(index) {
    if (index > 0) {
      const temp = Array.from(questionsList);
      [temp[index - 1], temp[index]] = [temp[index], temp[index - 1]];
      setQuestionsList(temp);
      updateCurrentQuestions();
    }
  }
  function moveDown(index) {
    if (index < questionsList.length - 1) {
      const temp = Array.from(questionsList);
      [temp[index + 1], temp[index]] = [temp[index], temp[index + 1]];
      setQuestionsList(temp);
      updateCurrentQuestions();
    }
  }
  function handleOnDragEnd(result) {
    const items = Array.from(questionsList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setQuestionsList(items);
    updateCurrentQuestions();
  }

  function updateCurrentQuestions() {
    setCurrentQuestions(
      questionsList.slice(indexOfFirstQuestion, indexOfLastQuestion)
    );
  }

  function deleteQuestion(index) {
    const items = Array.from(questionsList);
    items.splice(index, 1);
    setQuestionsList(items);
    updateCurrentQuestions();
  }

  return (
    <div className="card">
      <p className="h3 ms-3 my-3">Enveritas Assignment</p>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul
              className="characters list-group"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentQuestions &&
                currentQuestions.map(({ id, question, answer }, index) => (
                  <Draggable draggableId={id} key={id} index={index}>
                    {(provided) => (
                      <li
                        className="list-group-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div>
                          <p>
                            <span className="strong">
                              Question {(currentPage - 1) * 5 + index + 1} :
                            </span>{" "}
                            {question}
                          </p>
                          <p>
                            <span className="strong">Answer : </span>
                            {answer}
                          </p>
                        </div>

                        <Button
                          type="button"
                          className="btn btn-light"
                          onClick={() => {
                            moveUp(index);
                          }}
                          disabled={currentPage === 1 && index === 0}
                        >
                          Move Up
                        </Button>
                        <Button
                          type="button"
                          className="btn btn-light ms-2 "
                          onClick={() => {
                            moveDown(index);
                          }}
                        >
                          Move Down
                        </Button>
                        <Button
                          type="button"
                          className="btn btn-light ms-2"
                          onClick={() => deleteQuestion(index)}
                        >
                          Delete
                        </Button>
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <Button className="btn btn-light m-3 mb-5" onClick={() => setShow(true)}>
        Add New Question
      </Button>
      {questionsList && (
        <Pagination
          questionsList={questionsList}
          setCurrentPage={setCurrentPage}
          questionsPerPage={questionsPerPage}
          currentQuestions={currentQuestions}
          setCurrentQuestions={setCurrentQuestions}
        />
      )}
      <AddQuestionPopup
        show={show}
        setShow={(a) => setShow(a)}
        questionsList={questionsList}
        setQuestionsList={setQuestionsList}
        setCurrentQuestions={setCurrentQuestions}
        updateCurrentQuestions={updateCurrentQuestions}
      />
    </div>
  );
};

export default Home;


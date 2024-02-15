import React from "react";
import "./Quiz.css";
import quizQuestions from "../resources/quizQuestion.json";

class QuizComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      questions: quizQuestions,
      showConfirmation: false,
    };
  }

  handlePrevious = () => {
    this.setState((prevState) => ({
      currentQuestionIndex: Math.max(prevState.currentQuestionIndex - 1, 0),
    }));
  };

  handleNextOrReset = () => {
    const { currentQuestionIndex, questions } = this.state;
    if (currentQuestionIndex === questions.length - 1) {
      this.setState({ currentQuestionIndex: 0 });
    } else {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
    }
  };

  handleQuit = () => {
    this.setState({
      showConfirmation: true,
    });
  };

  handleConfirmationCancel = () => {
    this.setState({
      showConfirmation: false,
    });
  };

  handleConfirmationOK = () => {
    alert("You quit the game");
    // Handle further actions upon quitting here
    this.setState({
      showConfirmation: false,
    });
  };

  render() {
    const { currentQuestionIndex, questions, showConfirmation } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const buttonText = isLastQuestion ? "Reset" : "Next";

    return (
      <div className="container">
        <div className="quiz">
          <h3 id="quiz-heading">Question</h3>

          <p id="questionNumber">{`Question ${currentQuestionIndex + 1} of ${
            questions.length
          }`}</p>
          <p id="question">{currentQuestion.question}</p>

          <div className="options">
            <div id="optionA">{currentQuestion.optionA}</div>
            <div id="optionB">{currentQuestion.optionB}</div>
            <div id="optionC">{currentQuestion.optionC}</div>
            <div id="optionD">{currentQuestion.optionD}</div>
          </div>
          <div className="navigation">
            <button id="back" onClick={this.handlePrevious}>
              Previous
            </button>
            <button id="next" onClick={this.handleNextOrReset}>
              {buttonText}
            </button>
            <button id="exit" onClick={this.handleQuit}>
              Quit
            </button>
          </div>
        </div>
        {showConfirmation && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>Are you sure you want to quit the game?</p>
              <button onClick={this.handleConfirmationCancel}>Cancel</button>
              <button onClick={this.handleConfirmationOK}>OK</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default QuizComponent;
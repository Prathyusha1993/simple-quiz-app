import React, { Component } from "react";
import "./assets/style.css";
import quizService from "./quizService/data";
import QuestionBox from "./QuestionBox";
import Result from "./Result";

class Quizbee extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionBank: [],
			score: 0,
			responses: 0, //to keep track the number of questions answered
		};
	};

	getQuestions = () => {
		quizService().then((questions) => {
			this.setState({ questionBank: questions });
		});
	};

	componentDidMount() {
		this.getQuestions();
	}

    computeAnswer = (answer, correctAnswer) => {
        if(answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1 
            });
        };
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1 : 5
        });
    };

	playAgain = () => {
		this.getQuestions();
		this.setState({
			score: 0,
			responses: 0,
		});
	};

	render() {
		return (
			<div className="container">
				<div className="title">Quizbee</div>
				{this.state.questionBank.length > 0 &&
					this.state.responses < 5 &&
					this.state.questionBank.map(
						({ question, answers, correct, questionId }) => (
							<QuestionBox
								question={question}
								options={answers}
								key={questionId}
								selected={answer => this.computeAnswer(answer, correct)}
							/>
						)
					)}
				{this.state.responses === 5 ? (
					<Result score={this.state.score} playAgain={this.playAgain} />
				) : null}
			</div>
		);
	}
}

export default Quizbee;

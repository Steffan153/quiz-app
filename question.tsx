import React, { Component } from "react";
import { render } from "react-dom";
import "./question.css";

export default class Quiz extends Component<any> {
  constructor(props) {
    super(props);
  }
  state = {
    answered: false,
    correct: this.props.question[1].findIndex(x => x.correct),
    ua: null,
    isCorrect: null,
    next: false
  };

  static getDerivedStateFromProps(pp, ps) {
    if (ps.next)
      return {
        answered: false,
        correct: pp.question[1].findIndex(x => x.correct),
        ua: null,
        isCorrect: null,
        next: false
      };
    return ps;
  }

  onClick = (x, i) => {
    if (this.state.answered) return;
    this.setState((p: any) => ({
      answered: true,
      ua: i,
      isCorrect: i === p.correct
    }));
  };

  onNext = () => {
    this.setState({ next: true });
    this.props.onNext(this.state.isCorrect);
  };

  render() {
    return (
      <div className="has-background-light question">
        <div
          className="has-text-weight-bold is-size-4"
          style={{ marginBottom: "10px" }}
          dangerouslySetInnerHTML={{ __html: this.props.question[0] }}
        />
        <div className="columns" style={{ width: "100%" }}>
          {this.props.question[1].map((x, i) => (
            <div className="column is-half" key={i}>
              <button
                className={
                  "button ans" +
                  (this.state.answered
                    ? this.state.correct === i
                      ? " has-text-success"
                      : " has-text-danger"
                    : "") +
                  (this.state.ua === i
                    ? " is-active is-focused is-hovered"
                    : "")
                }
                onClick={() => this.onClick(x, i)}
                dangerouslySetInnerHTML={{ __html: x.a }}
              />
            </div>
          ))}
        </div>
        {this.state.answered && (
          <div
            className={
              (this.state.isCorrect ? "has-text-success" : "has-text-danger") +
              " is-size-5"
            }
          >
            {this.state.isCorrect ? "Correct!" : "Wrong. :("}
          </div>
        )}
        {this.state.answered && !this.props.isEnd && (
          <button className="button is-success" onClick={this.onNext}>
            Next
          </button>
        )}
      </div>
    );
  }
}

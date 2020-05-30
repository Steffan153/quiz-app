import React, { Component } from "react";
import { render } from "react-dom";
import Question from "./question";

export default class Quiz extends Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    results: [],
    loading: true,
    question: null,
    isEnd: false,
    i: 0,
    correct: 0,
    wrong: 0
  };

  formatQuestion(a) {
    return [
      a.question,
      this.shuffleArray(
        a.incorrect_answers
          .map(o => ({ a: o, correct: false }))
          .concat({ a: a.correct_answer, correct: true })
      )
    ];
  }

  componentDidMount() {
    const url = `https://opentdb.com/api.php?amount=10&category=${
      this.props.category
    }&difficulty=${this.props.difficulty}&type=multiple`;
    fetch(url)
      .then(x => x.json())
      .then(res => {
        this.setState((p: any) => ({
          loading: false,
          question: this.formatQuestion(res.results[p.i]),
          results: res.results,
          i: p.i + 1
        }));
        console.log(this.state);
      });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  onNext = ic => {
    if (this.state.i > 9)
      return this.setState((p: any) => ({
        isEnd: true,
        correct: p.correct + ic,
        wrong: p.wrong + !ic
      }));
    this.setState((p: any) => ({
      question: this.formatQuestion(p.results[p.i]),
      i: p.i + 1,
      // isEnd: p.i > 9,
      correct: p.correct + ic,
      wrong: p.wrong + !ic
    }));
  };

  render() {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {this.state.loading ? (
          "Loading..."
        ) : this.state.isEnd ? (
          <div className="is-size-4">
            Game ended. You got {this.state.correct} correct and{" "}
            {this.state.wrong} wrong.
          </div>
        ) : (
          <Question
            question={this.state.question}
            isEnd={this.state.isEnd}
            onNext={this.onNext}
          />
        )}
      </div>
    );
  }
}

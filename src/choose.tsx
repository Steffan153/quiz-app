import React, { Component } from 'react';

export default class Choose extends Component<any> {
  constructor(props) {
    super(props);
  }

  state = {
    category: '17',
    difficulty: 'easy',
  };

  play = () => {
    this.props.play(+this.state.category, this.state.difficulty);
  };

  render() {
    return (
      <div>
        <div className="field">
          <label className="label" htmlFor="category">
            Category
          </label>
          <div className="control">
            <div className="select">
              <select
                id="category"
                onChange={(e) => this.setState({ category: (e.target as any).value })}
                value={this.state.category}
              >
                <option value="17">Science &amp; Nature</option>
                <option value="18">Science: Computers</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="26">Celebrities</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="difficulty">
            Difficulty
          </label>
          <div className="control">
            <div className="select">
              <select
                name="difficulty"
                onChange={(e) => this.setState({ difficulty: (e.target as any).value })}
                value={this.state.difficulty}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" onClick={this.play}>
              Play
            </button>
          </div>
        </div>
      </div>
    );
  }
}

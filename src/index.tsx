import React, { Component } from 'react';
import Choose from './choose';
import Quiz from './quiz';
import { render } from 'react-dom';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    mode: 'select',
    game: {} as any
  };

  play = (c: number, d: string) => {
    this.setState({ game: { category: c, difficulty: d }, mode: 'quiz' });
  };

  render() {
    return (
      <div className="container">
        {this.state.mode === 'select' ? <Choose play={this.play} /> : <Quiz {...this.state.game} />}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));

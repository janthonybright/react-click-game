import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg'
import Wrapper from './components/Wrapper/index.js'
import Card from './components/ClickCards/index.js'
import ClickCards from './cards.json'
import Navbar from './components/Navbar/index.js'
import Header from './components/Header/index.js'

let correctGuess = 0;

class App extends Component {
  state = {
    score: 0,
    highScore: 0,
    clickedArray: [],
    ClickCards,
    game: "Only click each image once to win!"
  }

  handleScore = (id) => {
    let clickedArray = this.state.clickedArray;
    if (clickedArray.includes(id)) {
      correctGuess = 0;
      this.setState({ clickedArray: [], score: 0, game: "Game Over! Click on any card to start a new game" })
    } else {
      clickedArray.push(id);
      this.setState({ score: this.state.score + 1, game: "" });
      correctGuess++
      if (clickedArray.length === 12) {
        this.setState({ game: "You WON!", clickedArray: [] })
      }
      if (correctGuess > this.state.highScore) {
        this.setState({ highScore: correctGuess })
      }
    }

    const Shuffled = this.state.ClickCards.sort(() => Math.random() - 0.5)
    this.setState({ ClickCards: Shuffled })
  }

  render() {
    return (
      <>
        <Navbar score={this.state.score} highScore={this.state.highScore} />
        <Header game={this.state.game} />
        <Wrapper>
          {this.state.ClickCards.map(card => <Card image={card.image} key={card.id} name={card.name} id={card.id} handleScore={this.handleScore} />)}
        </Wrapper>
      </>
    );
  }
}

export default App;

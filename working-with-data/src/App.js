import React from 'react';
import axios from 'axios';

const Card = (props) => {
  return (
    <div style={{ margin: '1em 0', clear: 'both', overflow: 'auto'}}>
      <img width="75" src={props.avatar_url} alt="" style={{ float: 'left' }} />
      <div style={{ display: 'inline-block', marginLeft: 10, float: 'left' }}>
        <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
          <a href={ props.html_url } target="_blank">{props.name}</a>
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
}

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card key={ card.id } {...card} />)}
    </div>
  );
}

class Form extends React.Component {
  state = {
    userName: ''
  }
  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
        this.setState({ userName: "" });
      });
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          onChange={ (event) => this.setState({ userName: event.target.value })}
          placeholder="username" />
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    cards: []
  };

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  };

  render() {
    return(
      <div style={{ margin: '1em' }}>
        <Form onSubmit={ this.addNewCard } />
        <CardList cards={ this.state.cards }/>
      </div>
    );
  }
}


export default App;

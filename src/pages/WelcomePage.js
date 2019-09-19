import React, { Component } from 'react';

class WelcomePage extends Component {
  state = {
    name: ''
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const saveName = this.props.saveVisitorName(this.state.name);
    if (!saveName) {
      console.log('You must enter a name to continue! >:(')
    }
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <h2>Welcome to</h2>
        <h2>BRASTLEWARK!</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={name} onChange={this.handleChange} placeholder="Tsssh, human, what's yout name?" />
          <button type="submit">Open the door</button>
        </form>
      </div >
    );
  }
}

export default WelcomePage;

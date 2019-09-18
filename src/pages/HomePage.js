import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import brastlewarkService from '../services/BrastlewarkService';

class HomePage extends Component {
  state = {
    inhabitants: []
  }

  componentDidMount() {
    brastlewarkService.getAllHabitants()
      .then(response => {
        const inhabitants = response.data.Brastlewark;
        this.setState({
          inhabitants
        })
        console.log(inhabitants);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { inhabitants } = this.state;
    return (
      <div>
        {inhabitants.length === 0 ? <div>Loading... {/*Cool loading animation*/} </div> : (
          inhabitants.map(inhabitant => {
            return <Link key={inhabitant.id} to={{ pathname: `/gnomes/${inhabitant.id}`, gnomeInfo: inhabitant }} params={{ gnomeInfo: inhabitant }}><p>{inhabitant.name}</p></Link>;
          })
        )}
      </div >
    );
  }
}

export default HomePage;

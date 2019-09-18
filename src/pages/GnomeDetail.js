import React, { Component } from 'react';

import brastlewarkService from '../services/BrastlewarkService';

// We receive Gnome info from Link
class GnomeDetail extends Component {
  state = {
    gnomeInfo: this.props.location.gnomeInfo
  }

  // Make a new API call only in case of state's lost
  componentDidMount() {
    const { gnomeInfo } = this.state;
    if (gnomeInfo === undefined) {
      brastlewarkService.getAllHabitants()
        .then(response => {
          const inhabitants = response.data.Brastlewark;
          const gnomeInfo = inhabitants.filter(gnome => gnome.id === this.props.match.params.id * 1);
          this.setState({
            gnomeInfo: gnomeInfo[0]
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { gnomeInfo } = this.state;
    return (
      <div>
        <h1>Gnome Detail</h1>
        {gnomeInfo === undefined ? <div>Loading...</div> : (
          <div>
            <p>{gnomeInfo.name}</p>
            <p>{gnomeInfo.age}</p>
            <img src={gnomeInfo.thumbnail} alt={gnomeInfo.name} />
          </div>
        )}
      </div>
    );
  }
}

export default GnomeDetail;

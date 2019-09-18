import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import brastlewarkService from '../services/BrastlewarkService';

class HomePage extends Component {
  state = {
    inhabitants: [],
    paginatedInhabitants: [],
    itemsPerPage: 135,
    numberOfPages: 1,
    currentPage: 1
  }

  componentDidMount() {
    brastlewarkService.getAllHabitants()
      .then(response => {
        const inhabitants = response.data.Brastlewark;
        this.pagination(inhabitants, this.state.currentPage);
      })
      .catch(error => {
        console.log(error);
      });
  }

  pagination = (inhabitants, currentPage) => {
    const { itemsPerPage } = this.state;
    const numberOfPages = Math.ceil(inhabitants.length / itemsPerPage);
    const paginatedInhabitants = inhabitants.slice((itemsPerPage * currentPage) - itemsPerPage, itemsPerPage * currentPage);
    console.log(paginatedInhabitants);
    this.setState({
      inhabitants,
      numberOfPages,
      paginatedInhabitants,
      currentPage
    })
  }

  render() {
    // const { inhabitants } = this.state;
    const { paginatedInhabitants, numberOfPages, currentPage, inhabitants } = this.state;
    return (
      <div>
        {paginatedInhabitants.length === 0 ? <div>Loading... {/*Cool loading animation*/} </div> : (
          <div>
            {paginatedInhabitants.map(inhabitant => {
              return <Link key={inhabitant.id}
                to={{ pathname: `/gnomes/${inhabitant.id}`, gnomeInfo: inhabitant }}
                params={{ gnomeInfo: inhabitant }}>
                <p>{inhabitant.name}</p>
              </Link>;
            })}
            <div>{Array.from(Array(numberOfPages), (e, i) => { return <a key={i} onClick={() => this.pagination(inhabitants, i + 1)}>{i + 1}</a> })}</div>
          </div>
        )}
      </div >
    );
  }
}

export default HomePage;

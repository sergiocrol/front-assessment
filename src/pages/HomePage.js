import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import brastlewarkService from '../services/BrastlewarkService';

class HomePage extends Component {
  state = {
    inhabitants: [],
    paginatedInhabitants: [],
    itemsPerPage: 135,
    numberOfPages: 1,
    currentPage: 1,
    searchName: ''
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
    const { itemsPerPage, searchName } = this.state;
    const filteredInhabitants = [...inhabitants].filter(inhabitant => { return inhabitant.name.includes(searchName) });
    const numberOfPages = Math.ceil(filteredInhabitants.length / itemsPerPage);
    console.log(searchName, filteredInhabitants)
    const paginatedInhabitants = filteredInhabitants.slice((itemsPerPage * currentPage) - itemsPerPage, itemsPerPage * currentPage);
    this.setState({
      inhabitants,
      numberOfPages,
      paginatedInhabitants,
      currentPage
    })
  }

  handleChange = (event) => {
    const { inhabitants, currentPage } = this.state;
    const { name, value } = event.target;
    this.setState({ [name]: value });
    this.pagination(inhabitants, currentPage);
  }

  render() {
    // const { inhabitants } = this.state;
    const { paginatedInhabitants, numberOfPages, currentPage, inhabitants, searchName } = this.state;
    return (
      <div>
        <div><input name="searchName" value={searchName} onChange={this.handleChange} placeholder="Filter Gnomes by name :3" /></div>
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

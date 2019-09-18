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
    searchName: '',
    searchAge: ''
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

  // This method paginate the result list to a better UX. The result is filtered by the searchName input value
  pagination = (inhabitants, currentPage) => {
    const { itemsPerPage, searchName } = this.state;
    const filteredInhabitants = this.filterInhabitants(inhabitants);
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

  // Helper function to filter by different parameters
  filterInhabitants = (inhabitants) => {
    const { searchName, searchAge } = this.state;
    let filterInhabitants = [...inhabitants].filter(inhabitant => { return inhabitant.name.toLowerCase().includes(searchName.toLowerCase()) });
    filterInhabitants = [...filterInhabitants].filter(inhabitant => { return inhabitant.age.toString().includes(searchAge) });
    return filterInhabitants;
  }

  handleChange = (event) => {
    const { inhabitants, currentPage } = this.state;
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => { this.pagination(inhabitants, currentPage); });
  }

  render() {
    // const { inhabitants } = this.state;
    const { paginatedInhabitants, numberOfPages, currentPage, inhabitants, searchName, searchAge } = this.state;
    return (
      <div>
        <div>
          <input type="text" name="searchName" value={searchName} onChange={this.handleChange} placeholder="Filter Gnomes by name :3" />
          <input type="number" name="searchAge" value={searchAge} onChange={this.handleChange} placeholder="age" />
        </div>
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

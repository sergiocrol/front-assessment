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
    searchAge: '',
    searchProfession: '',
    searchHairColor: '',
    professionList: [],
    hairColorList: []
  }

  // Get all the inhabitants of the town. We save also the list of all professions/hairColor to display it in a select input
  componentDidMount() {
    brastlewarkService.getAllHabitants()
      .then(response => {
        const inhabitants = response.data.Brastlewark;
        const professionList = [...new Set(inhabitants.reduce((acc, curr) => { return acc = acc.concat(curr.professions); }, []))];
        const hairColorList = [...new Set(inhabitants.map(inhabitant => inhabitant.hair_color))];
        this.setState({
          professionList,
          hairColorList
        }, () => this.pagination(inhabitants, this.state.currentPage));
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
    const paginatedInhabitants = filteredInhabitants.slice((itemsPerPage * currentPage) - itemsPerPage, itemsPerPage * currentPage);
    console.log(paginatedInhabitants)
    this.setState({
      inhabitants,
      numberOfPages,
      paginatedInhabitants,
      currentPage
    })
  }

  // Helper function to filter by different parameters
  filterInhabitants = (inhabitants) => {
    const { searchName, searchAge, searchProfession, searchHairColor } = this.state;
    let filterInhabitants = [...inhabitants].filter(inhabitant => { return inhabitant.name.toLowerCase().includes(searchName.toLowerCase()) });
    filterInhabitants = [...filterInhabitants].filter(inhabitant => { return inhabitant.age.toString().includes(searchAge) });
    filterInhabitants = [...filterInhabitants].filter(inhabitant => { return (searchProfession === '') ? true : inhabitant.professions.includes(searchProfession) });
    filterInhabitants = [...filterInhabitants].filter(inhabitant => { return (searchHairColor === '') ? true : inhabitant.hair_color.includes(searchHairColor) });
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
    const { paginatedInhabitants, numberOfPages, currentPage, inhabitants, searchName, searchAge, searchProfession, searchHairColor, professionList, hairColorList } = this.state;
    return (
      <div>
        <div>
          <input type="text" name="searchName" value={searchName} onChange={this.handleChange} placeholder="Filter Gnomes by name :3" />
          <input type="number" name="searchAge" value={searchAge} onChange={this.handleChange} placeholder="age" />
          <select name="searchProfession" onChange={this.handleChange} value={searchProfession}>
            <option value="">select profession</option>
            {professionList.map((profession, i) => { return <option key={i} value={profession}>{profession}</option> })}
          </select>
          <select name="searchHairColor" onChange={this.handleChange} value={searchHairColor}>
            <option value="">select Hair Color</option>
            {hairColorList.map((color, i) => { return <option key={i} value={color} style={{ color, fontWeight: '700' }}>&#11044;  {color.toUpperCase()}</option> })}
          </select>
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

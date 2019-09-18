import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchResultCard from '../components/SearchResultCard';

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
    hairColorList: [],
    isLoading: true
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
    const { itemsPerPage } = this.state;
    const filteredInhabitants = this.filterInhabitants(inhabitants);
    const numberOfPages = Math.ceil(filteredInhabitants.length / itemsPerPage);
    const paginatedInhabitants = filteredInhabitants.slice((itemsPerPage * currentPage) - itemsPerPage, itemsPerPage * currentPage);
    console.log(paginatedInhabitants)
    this.setState({
      inhabitants,
      numberOfPages,
      paginatedInhabitants,
      currentPage,
      isLoading: false
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
    const { inhabitants } = this.state;
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => { this.pagination(inhabitants, 1); });
  }

  // Reset all the filtering fields
  reset = () => {
    const { inhabitants } = this.state;

    this.setState({
      searchName: '',
      searchAge: '',
      searchProfession: '',
      searchHairColor: ''
    }, () => { this.pagination(inhabitants, 1) })
  }

  render() {
    const { paginatedInhabitants,
      numberOfPages,
      currentPage,
      inhabitants,
      searchName,
      searchAge,
      searchProfession,
      searchHairColor,
      professionList,
      hairColorList,
      isLoading } = this.state;

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
            {hairColorList.map((color, i) => { return <option key={i} value={color} style={{ color, fontWeight: '700' }}>{color.toUpperCase()}</option> })}
          </select>
          <a href="#0" onClick={this.reset}>reset</a>
        </div>
        {paginatedInhabitants.length === 0 ? isLoading ? <div>Loading...</div> : <div>No items </div> : (
          <div>
            {paginatedInhabitants.map(inhabitant => {
              return <Link key={inhabitant.id}
                to={{ pathname: `/gnomes/${inhabitant.id}`, gnomeInfo: inhabitant }}
                params={{ gnomeInfo: inhabitant }}>
                <SearchResultCard inhabitant={inhabitant} />
                {/* <p>{inhabitant.name}</p> */}
              </Link>;
            })}
            <div>{Array.from(Array(numberOfPages), (e, i) => {
              return (numberOfPages > 1) ?
                <a href="#0" className={currentPage === i + 1 ? 'u-is-disabled' : ''} key={i} onClick={() => this.pagination(inhabitants, i + 1)}>{i + 1}</a>
                : null
            })}</div>
          </div>
        )}
      </div >
    );
  }
}

export default HomePage;

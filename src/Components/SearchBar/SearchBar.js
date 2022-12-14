import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component{
    constructor(props){
        super(props);

        this.state = { term: '' };

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        console.log(" >> searchBar.js > search() on term: ", this.state.term);
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event){
        let searchTerm = event.target.value;
        // console.log(" >> SearchBar.js > handleTermChange > term: ", searchTerm);
        this.setState( { term: searchTerm } );
    }

    render(){
        return(
            <div className="SearchBar">
                 <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}  />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }

}

export default SearchBar;
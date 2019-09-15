import React from 'react';
import { Link } from 'react-router-dom'

import { ReactComponent as SearchIcon } from '../../assets/search.svg';
import './SearchBar.scss';


class SearchBar extends React.Component {
    state = {
        value: this.props.value || '',
    }

    inputRef = React.createRef();

    handleChange = event => {
		this.setState({
			value: event.target.value
		});
    };
    
    handleKeyPress = event => {
		if (event.key === "Enter") {
			this.props.history.push({
                pathname: `/search/`,
                search: `?text=${this.state.value}`
            });
            
            if (!!this.props.onFetch) {
                this.props.onFetch(this.state.value);
            }
        }
    };
    
	render() {
		return (
			<div className="SearchBar-root">
                <div className="SearchBar-input">
                    <input
                        type="text"
                        className="Input-root Input-search"
                        ref={this.inputRef}
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        autoFocus
                    />
                    <SearchIcon className="Icon-root Icon-search Input-icon" />
                </div>
                <div className="SearchBar-submit">
                    <Link to={{
                        pathname: `/search/`,
                        search: `?text=${this.state.value}`
                    }} className="Button-root Button-search">Search</Link>
                </div>
            </div>
		);
	}
}

export default SearchBar;

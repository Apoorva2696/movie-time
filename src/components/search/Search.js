import React, { Component } from 'react';
import './index.scss';


// function debounce(func, context, wait) {
//     let timeout;
//     return function() {
//     //   const context = this;
//       console.log( context);
//       const args = arguments;
//       const later = function() {
//         timeout = null;
//         func.apply(context, args);
//       };
//       clearTimeout(timeout);
//       timeout = setTimeout(later, wait);
//     };
//   };

/**
 * @render react
 * @name Search
 * @description search input.
 * @example
 * <Search />
 */
class Search extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: ''
        };

        this._bind();
    }

    _bind() {
        this.handleKeyUp = this.handleKeyUp.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }

    handleChange( e ) {

        this.setState( { searchQuery: e.target.value }, 
            () => {
                this.props.onSubmit( this.state.searchQuery );
            }
        );
    }

    handleKeyUp( e ) {
      
        if (e.key === 'Enter' && this.state.searchQuery !== '') {
            this.props.onSubmit( this.state.searchQuery );
        }
    }


    render() {

        return(
            <div id="search" className={'search'}>
                <input
                    onKeyUp={ this.handleKeyUp }
                    onChange={ this.handleChange }
                    type="search"
                    placeholder="Search for a title..."
                    value={ this.state.searchQuery }
                />
            </div>
        );
    }

}

export default Search;
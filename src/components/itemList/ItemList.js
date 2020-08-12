import React, { Component, Fragment } from 'react';
import Item from '../item';
import './style.scss';
import { connect } from 'react-redux'
import { debounce } from 'lodash';


/**
 * @render react
 * @name TitleList
 * @description List titles by different categories and filters
 * @example
 * <TitleList
 *    title="Trending now"
 *    url="discover/movie?sort_by=popularity.desc&page=1"
 * />
 */
class ItemList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: 'userList' === this.props.type ? ( 'Watched' === this.props.category ? this.props.watchList: this.props.userList ): {},
      page: 1,
      param: this.props.param,
      isFetching: false
    };

    this.loadContent = debounce( this.loadContent, 3000 );

  }

  

  loadContent() {

    var requestUrl = this.props.api + `${this.state.param}&page=${this.state.page}` +this.props.apiKey;
    fetch(requestUrl).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ data, isFetching: false });
    }).catch((err) => {
      console.log("There has been an error", err);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.param !== this.props.param && nextProps.param !== '') {
      this.setState({ mounted: true, param: nextProps.param, isFetching: true }, () => {
        this.loadContent();
      });

    }
  }

  componentDidMount() {
    if ( this.props.param !== '' && 'userList' !== this.props.type ) {
      
      this.setState({ isFetching: true }, this.loadContent);
    }
  }

  render() {

    var titles = '' ;
    const { type } = this.props;

    if ( ( this.state.data && this.state.data.results ) || ( this.state.data && this.state.data.Search ) ) {
      const results = this.state.data.results ? this.state.data.results : this.state.data.Search;
      titles = results.map(function (title, i) {
        
          var name = '';
          var backDrop = title.backdrop_path ? 'http://image.tmdb.org/t/p/original' + title.backdrop_path: title.Poster;
          if (!title.name && !title.Title) {
            name = title.original_title;
          } else {
            name = title.name ? title.name:title.Title;
          }

          return (
            <Item
              key={`${name}__${i}`}
              item={ { ...title, title: name, backdrop: backDrop } }
              showButtons = { 'userList' !== type }
            />
          );

        
      });
    }

    const _className = 'searchList' === this.props.type ? 'title-list title-list__page': 'title-list';

    return (
      <div
        className={_className}>
        <div className='title-list__title'>
          <h1>{this.props.title}</h1>
          {
            this.state.isFetching ?
            <div className='title-list__title__preloader'>
              {
                [ 1,2,3,4 ].map( () => {
                  return(<div className='title-list__title__preloader__item'></div>);
                })
              }
            </div>:
              <Fragment>
                <div className='titles-wrapper'>
                  { titles ? titles: <div className='titles-wrapper__no-data'> {'No Results Found!'}</div>}
                </div>
                { 'searchList' === type && titles && 10 === titles.length ? <div className ='pagination__container'>
                          <span className = 'pagination__container__item' onClick={ () => this.setState({page:1}, this.loadContent ) }>1</span>
                          <span className = 'pagination__container__item' onClick={ () => this.setState({page:2}, this.loadContent) }>2</span>
                          <span className = 'pagination__container__item' onClick={ () => this.setState({page:3}, this.loadContent) }>3</span>
                          <span className = 'pagination__container__item' onClick={ () => this.setState({page:4}, this.loadContent) }>4</span>
                          <span className = 'pagination__container__item' onClick={ () => this.setState({page:5}, this.loadContent) }>5</span>
                  </div> : null } 
              </Fragment>
          }
            </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    watchList: state.watchList,
    userList: state.userContentList
  };
};
export default connect(mapStateToProps, null)(ItemList);
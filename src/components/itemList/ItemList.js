import React, { Component } from 'react';
import Item from '../item';
import './style.scss';


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
export default class ItemList extends Component {

  static defaultProps = {
    title: "Trending now",
    url: 'discover/movie?sort_by=popularity.desc&page=1'
  }

  state = {
    data: [],
    mounted: false,
    param: this.props.param
  };

  loadContent() {
    var requestUrl = this.props.api + this.state.param + this.props.apiKey;
    fetch(requestUrl).then((response) => {
      return response.json();
    }).then((data) => {
      this.setState({ data: data });
    }).catch((err) => {
      console.log("There has been an error");
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.param !== this.props.param && nextProps.param !== '') {
      this.setState({ mounted: true, param: nextProps.param }, () => {
        console.log( 'onchangeitemlist', this.state.param);
        this.loadContent();
      });

    }
  }

  componentDidMount() {
    if (this.props.url !== '') {
      this.loadContent();
      this.setState({ mounted: true });
    }
  }

  render() {
    var titles = '';
    if (this.state.data.results || this.state.data.Search ) {
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
            <Item key={`${name}__${i}`} title={name} score={title.vote_average} overview={title.overview} backdrop={backDrop} />
          );

        
      });
    }

    const _className = 'searchList' === this.props.type ? 'title-list title-list__page': 'title-list';
    return (
      <div
        className={_className} data-loaded={this.state.mounted}>
        <div className={'title-list__title'}>
          <h1>{this.props.title}</h1>
          <div className={'titles-wrapper'}>
            {titles}
          </div>
        </div>
      </div>
    );
  }
}

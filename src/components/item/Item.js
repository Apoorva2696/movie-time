import React, { Component } from 'react';
import './style.scss';
import ActionButton from '../actionButton';

/**
 * @render react
 * @name Item
 * @description movieTime title items
 * @example
 * <Item
 *   title='Demo List Item'
 *   rating={6}
 *   overview='This demo item brought you by the Bit team'
 *   backdrop='http://image.tmdb.org/t/p/original/aok7IhrbA83josNz9Dqh8tNA0Ao.jpg'
 * />
 */
const Item = (props) => {

    const { backdrop, title, score, overview } = props;
    
  return (
    <div className= 'item' style={{ backgroundImage: 'url(' + backdrop + ')' }} >
      <div className='overlay'>
        <div className='item__title'>{title}</div>
        { score && <div className='item__rating'>{score} / 10</div> }
        { overview && <div className='item__plot'>{overview}</div> }
        <div className='item__actions'>
          <ActionButton icon = { 'watchLater' }/>
          <ActionButton />
        </div>
      </div>
    </div>
  );
  
};

export default Item;

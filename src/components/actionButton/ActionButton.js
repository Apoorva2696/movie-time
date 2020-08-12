import React, { useState, useEffect } from 'react';
import './style.scss';
/**
 * @name ListToggle
 * @description Button for adding items to favorites/watch later list
 * @example
 * <ActionButton />
 */
const ActionButton = ( props ) =>  {
  
  const [ toggled, setToggeled ] = useState(false);

  useEffect( () => {
    if( toggled ) {
      props.onClick();
    }
  }, [toggled]);

  const icon = 'watchLater' === props.icon ? 'television' : 'plus';

  return (
    <div onClick={ () => { setToggeled( !toggled );  } } data-toggled={ toggled } className={'action-button'}>
      <div>
        <i className={`fa fa-fw fa-${ toggled ? 'check': icon }`}></i>
      </div>
    </div>
  );
  
}

export default ActionButton;
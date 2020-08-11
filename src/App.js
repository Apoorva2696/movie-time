import React from 'react';
import './App.scss';
import Search from './components/search';
import ListingPage from './components/listingPage';

const App = () => {
  const[ searchQuery, setQuery ] = React.useState('');

  return (
    <div className='App'>
      <header className='App__header'>
        <nav className='App__header__navigation'>
          <Search onSubmit = { ( param ) => { console.log( 'app', param ); setQuery( `?s=${param}` ); } } />
        </nav>
      </header>
      <section className='App__section'>
      {
        '' !== searchQuery && null !== searchQuery ?
          <ListingPage listType={ 'searchList' } searchQuery = { searchQuery }/>:
          <ListingPage listType={ 'dashboardItemList' } />
      }
      </section>
    </div>
  );
}

export default App;

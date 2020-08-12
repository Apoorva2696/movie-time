import React from 'react';
import './App.scss';
import Search from './components/search';
import ListingPage from './components/listingPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  const[ searchQuery, setQuery ] = React.useState('');

  return (
    <Router>
      <div className='App'>
        <header className='App__header'>
          <nav className='App__header__navigation'>
            <Link to="/">
              <img alt='home' src='favicon.svg'/>
            </Link>
            <Link className='App-link' to="/user-list">My Content</Link>
            <Search onSubmit = { ( param ) => { setQuery( '' !== param ? `?s=${param}`: '' ); } } />
          </nav>
        </header>
        <Switch>
          <Route exact path="/">
              <section className='App__section'>
              <h1 className='App__section__heading'>Hi, Welcome to Movie Time!</h1>
              {
                '' !== searchQuery && null !== searchQuery ?
                  <ListingPage listType={ 'searchList' } searchQuery = { searchQuery }/>:
                  <ListingPage listType={ 'dashboardItemList' } />
              }
            </section>
          </Route>
          <Route exact path="/user-list">
            <section className='App__section'>
            {
                '' !== searchQuery && null !== searchQuery ?
                  <ListingPage listType={ 'searchList' } searchQuery = { searchQuery }/>:
                <ListingPage listType={ 'userList' }/>
            }
            </section>
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;

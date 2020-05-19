import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/shared/Header';
import UsersList from './components/users/UsersList';
import PlaceList from './components/places/PlaceList';
import NewPlace from './components/places/NewPlace';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={UsersList} />
          <Route exact path="/:userId/places" component={PlaceList} />
          <Route exact path="/places/new" component={NewPlace} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;

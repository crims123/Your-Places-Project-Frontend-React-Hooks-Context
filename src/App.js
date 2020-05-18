import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Users from './components/users/pages';
import NewPlace from './components/places/NewPlace';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Users} />
        <Route exact path="/places/new" component={NewPlace} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

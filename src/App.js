import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/shared/Header';
import Users from './components/users/pages';
import NewPlace from './components/places/NewPlace';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/places/new" component={NewPlace} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthContextStore from './context/auth-context';
import Header from './components/shared/Header';
import UsersList from './components/users/UsersList';
import PlaceList from './components/places/PlaceList';
import UpdatePlace from './components/places/UpdatePlace';
import NewPlace from './components/places/NewPlace';
import Login from './components/users/Auth/Login';
import SignUp from './components/users/Auth/SignUp';

const App = () => {
  return (
    <BrowserRouter>
      <AuthContextStore>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={UsersList} />
            <Route exact path="/:userId/places" component={PlaceList} />
            <Route exact path="/places/new" component={NewPlace} />
            <Route exact path="/places/:placeId" component={UpdatePlace} />
            <Route exact path="/auth" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </main>
      </AuthContextStore>
    </BrowserRouter>
  );
};

export default App;

import './App.css';
import Home from './components/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbars from './components/Navbars/Navbars';
import LogIn from './components/LogIn/LogIn';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { createContext, useState } from 'react';
import Search from './components/Search/Search';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <p>Name: {loggedInUser.name}</p>
    <div className="App">
      <Navbars></Navbars>
      

      <Router>
        <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <LogIn></LogIn>
            </Route>
            <PrivateRoute path="/option/:id">
              <Search></Search>
            </PrivateRoute> 
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;

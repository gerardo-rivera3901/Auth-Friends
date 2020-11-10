import './App.css';
import React, {useState} from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { Login } from './components/Login'
import { PrivateRoute } from './components/PrivateRoute'
import { FriendsList } from './components/FriendsList'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        <Link to='/login'>Login</Link>
        {isLoggedIn ? <Link to='/protected'>Friends List</Link> : <div></div> }
        
        <Switch>
          <PrivateRoute exact path='/protected' component={FriendsList} />
          <Route path='/login' render={props => {
            return <Login {...props} setLoggedIn={setLoggedIn} />
          }} />
        </Switch>
      </header>
    </div>
  );
}

export default App;

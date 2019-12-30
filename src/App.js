import React from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import UserList from './components/UserList';



function App() {
  return (
    <Router>
      <Route path="/" exact component={UserList} />
      <Route path="/add" component={AddUser} />
      <Route path="/update/:id" component={UpdateUser} />
    </Router>
  );
}

export default App;
import './App.css';
import React from 'react';
//React-router-dom
import { Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
//Components
import Home from './components/Home/Home.jsx';
import Nav from './components/Nav/Nav.jsx'
import Create from './components/CreateRecipe/Create.jsx';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={Nav}/>
      <Route path='/home' component={Home}/>
      <Route path='/createRecipe' component={Create}/>
    </BrowserRouter>
  );
}

export default App;

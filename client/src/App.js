import './App.css';
import React from 'react';
//React-router-dom
import { Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
//Components
import Home from './components/Home/Home.jsx';
import Nav from './components/Nav/Nav.jsx'
import Create from './components/CreateRecipe/Create.jsx';
import Details from './components/Details/Details';
import Landing from './components/Landing/Landing';
import About from './components/About/About';

function App() {

  const ITEMS_PER_PAGE = 8;

  return (
    <BrowserRouter>
      <Route path='/' component={Nav}/>
      <Route exact path='/' component={Landing}/>
      <Route path='/home' component={Home}/>
      <Route path='/details/:recipeName' component={Details}/>
      <Route path='/createRecipe' component={Create}/>
      <Route path='/about' component={About}/>
    </BrowserRouter>
  );
}

export default App;

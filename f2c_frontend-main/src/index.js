import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Profile from './Profile'
import Signup from './Signup';
import Login from './Login';
import Availproduct from './Availproduct';
import ItemManager from './ItemManager';
import { BrowserRouter } from 'react-router-dom';
import Dashboard_g from './Dashboard_g';
// import Profile from './profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <App />
      {/* <Profile></Profile> */}
      {/* <Signup></Signup> */}
      {/* <Dashboard_g></Dashboard_g> */}
      {/* <Login></Login> */}
      {/* <Availproduct></Availproduct> */}
      {/* <ItemManager></ItemManager> */}
    </BrowserRouter>
  </>
);

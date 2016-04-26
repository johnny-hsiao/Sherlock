import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Grid from 'react-bootstrap/lib/Grid';

import LandingPage from './components/LandingPage/LandingPage';
import Dashboard from './components/Dashboard/Dashboard';
import MainNavbar from './components/MainNavbar/MainNavbar';
import SideBar from './components/SideBar/SideBar';
import style from './style.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCategory: "1"
    };
  }

  _updateCurrentCategory = (newCategory) => {
    console.log(newCategory, "changed in App")
    this.setState({
      currentCategory: newCategory
    })
  }

  render() {
    return (
      <div className="row">
        <MainNavbar />
        <div className="main-container col-xs-12">
          <div className="row">
            <div className="side-bar col-xs-12 col-sm-2 col-md-2 col-lg-2">
              <SideBar { ...this.state } onCategoryChange={ this._updateCurrentCategory } />
            </div>
            <div className="dashboard col-xs-12 col-sm-10 col-md-10 col-lg-10">
              <Dashboard { ...this.state } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


{

//<LandingPage />

}


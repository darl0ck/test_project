import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";


import { withStyles } from '@material-ui/core/styles';

import TradingPairs from './Components/tradingPairs';
import MainPage from './Components/mainPage';
import CreditPage from './Components/creditPage';

import './App.css';
import Profile from './Components/profile';
import VoitingPage from './Components/voitingPage';
import Balance from './Components/balancePage';
import faqPage from './Components/faqPage';


const styles = theme =>( {
  root: {
    backgroundImage: "url('./Static/Images/backgroundGraph.png')",
    // width: 'max-content'
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  card: {
    height: '45em',
  },
  table: {
    width: 'fit-content',
    paddingRight: '3em',
    fontSize: '1.2rem',
  },
  deal:{
    // float: 'right',
    marginRight: '4em',
    // marginLeft: '1em'
  },
  dealTable: {
      overflowY: 'scroll',
      height: '29em',
      width: 'min-content'
  },
  myDealsTable: {
    overflowY: 'scroll',
    height: '29em',
    width: 'min-content',
    marginTop: '3em',
  },
  tablePaper: {
    width: 'min-content',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {

  state = {
    activeTab: 'Home',
  }

  changeActiveTab(tab){
    this.setState({
      activeTab: tab,
    })
  }

  render() {
    console.info(this.props);
    const { classes } = this.props;

    return (
      <HashRouter>
          <div className={classes.root}>
            <header className="Menu">
            <nav class="navbar navbar-expand-lg navbar-dark menuBack">
                    <a class="nav-link Finside" href="#/"
                     onClick={()=>{
                      this.changeActiveTab('Home')
                }}
                    >Finside</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                      <ul class="navbar-nav ml-md-auto d-md-flex">
                        <li class={`nav-item ${this.state.activeTab === 'Home' ? 'active' : ''}`}
                          onClick={()=>{
                                this.changeActiveTab('Home')
                          }}
                        >
                          <a class="nav-link" href="#/">Home</a>
                        </li>
                        <li class={`nav-item ${this.state.activeTab === 'profile' ? 'active' : ''}`}
                          onClick={()=>{
                                this.changeActiveTab('profile')
                          }}
                        >
                          <a class="nav-link" href="#/profile">Profile</a>
                        </li>
                        <li class={`nav-item ${this.state.activeTab === 'creditPage' ? 'active' : ''}`}
                          onClick={()=>{
                                this.changeActiveTab('creditPage')
                          }}
                        >
                          <a class="nav-link" href="#/creditPage">Credit Page</a>
                        </li>
                        <li class={`nav-item ${this.state.activeTab === 'voiting' ? 'active' : ''}`}
                          onClick={()=>{
                                this.changeActiveTab('voiting')
                          }}
                        >
                          <a class="nav-link" href="#/voiting">Voiting</a>
                        </li>
                        <li class={`nav-item ${this.state.activeTab === 'Balance' ? 'active' : ''}`}
                          onClick={()=>{
                                this.changeActiveTab('Balance')
                          }}
                        >
                          <a class="nav-link" href="#/balance">Balance</a>
                        </li>

                        <li class={`nav-item ${this.state.activeTab === 'FAQ' ? 'active' : ''}`}
                          onClick={()=>{
                                this.changeActiveTab('FAQ')
                          }}
                        >
                          <a class="nav-link" href="#/faq">FAQ</a>
                        </li>
                      </ul>
                    </div>
            </nav>
            </header>

            <Route exact path="/" component={MainPage}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/creditPage" component={CreditPage}/>
            <Route path="/voiting" component={VoitingPage}/>
            <Route path="/balance" component={Balance}/>
            <Route path="/faq" component={faqPage}/>
          </div>
      </HashRouter>
    );
  }
}

export default withStyles(styles)(App);

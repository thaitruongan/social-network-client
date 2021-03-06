import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import{Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions'; 

import './App.css';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import profile from './pages/profile';
import AuthRoute from './util/AuthRoute';
import user from './pages/user';
import resetpassword from './pages/resetpassword'

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/'    
  }
  else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }

}

class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>       
            <Router>         
                <AuthRoute exact path="/" component={login}/>
                <Route exact path="/home" component={home}/>
                <Route exact path="/resetpassword" component={resetpassword}/>
                <AuthRoute exact path="/signup" component={signup}/>
                <Route exact path="/profile" component={profile}/>
                <Route exact path="/users/:handle" component = {user}/>
                <Route exact path="/users/:handle/feed/:feedId" component={user}/>
            </Router>
        </Provider>        
      </MuiThemeProvider>
    );
  }
}

export default App;

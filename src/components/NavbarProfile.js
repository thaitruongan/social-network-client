import React, { Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {logoutUser, uploadImage } from '../redux/actions/userActions';
import Notifications from './Notifications';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home'
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'

const styles = (theme) =>({
  small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
  name:{
    marginRight:10
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent:'center'
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
      justifyContent:'center'
    },
  }
})

class NavBar extends Component {  
  handleLogout = () =>{
    this.props.logoutUser();
  }
  render() {
    const {classes,user:{credentials:{handle,imageUrl}},authenticated}= this.props; 
    return (
      <AppBar>
        <Toolbar>
           {authenticated ?(
             <Fragment>
                <Grid item sm={3} xs={12}>
                  <div className={classes.sectionDesktop}/>                  
                </Grid>
                <Grid item sm={6} xs={12}>
                  <div className={classes.sectionDesktop}>
                    <IconButton aria-label="show 4 new mails" color="inherit" component={Link} to="/home">
                        <Badge badgeContent={0} color="secondary">
                          <HomeIcon />
                        </Badge>
                    </IconButton>
                    <Notifications/>   
                  </div>           
                </Grid>
                <Grid item sm={3} xs={12}>
                  <div className={classes.sectionDesktop}>
                    <Button aria-label="show 4 new mails" color="inherit" component={Link} to="/profile">
                        <Typography variant="caption" className={classes.name}>{handle}</Typography>
                        <Avatar alt="Remy Sharp" src={imageUrl} className={classes.small} />
                    </Button>
                    <IconButton aria-label="show 4 new mails" color="inherit" onClick={this.handleLogout} component={Link} to="/">
                          <ExitToAppIcon/>
                    </IconButton>    
                  </div>            
                </Grid>
                <div className={classes.sectionMobile}>
                    <IconButton aria-label="show 4 new mails" color="inherit" component={Link} to="/home">
                        <Badge badgeContent={0} color="secondary">
                          <HomeIcon />
                        </Badge>
                    </IconButton>
                    <Notifications/>
                    <Button aria-label="show 4 new mails" color="inherit" component={Link} to="/profile">
                            <Typography variant="caption" className={classes.name}>{handle}</Typography>
                            <Avatar alt="Remy Sharp" src={imageUrl} className={classes.small} />
                        </Button>
                        <IconButton aria-label="show 4 new mails" color="inherit" onClick={this.handleLogout} component={Link} to="/">
                            <ExitToAppIcon/>
                    </IconButton> 
                </div>
             </Fragment>
           ):(
             <AppBar>
                <Toolbar></Toolbar>
             </AppBar>
           )}             
        </Toolbar>
      </AppBar>
    )
  }

}
const mapStateToProps = (state) =>({
  user:state.user,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {logoutUser, uploadImage};

NavBar.propStypes = {
  logoutUser: propTypes.func.isRequired,
  uploadImage: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  classes: propTypes.object.isRequired,
  authenticated: propTypes.bool.isRequired
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(NavBar))

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NoImg from '../images/no-img.png';
// MUI
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = (theme) => ({
    ...theme.spreadThis,

  handle: {
    height: 10,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  },
  paper: {
    padding: 20
  },
  profile: {
    display:'flex',
    '& .image-wrapper': {
        marginRight:'20px',
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 55,
      height: 55,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-images': {
        width: 35,
        height: 35,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
    '& .profile-details': {
      textAlign: 'left',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 5px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
});

const MiniProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image"/>
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
            <Skeleton variant="text" />
        </div>
      </div>
      <br/>
      <div>
            <Skeleton variant="text" style={{width:90}}/>
      </div>
      <br/>
      <div className={classes.profile} style={{marginBottom:10}}>
        <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-images"/>                                              
        </div>                    
        <hr/>
        <div className="profile-details">
            <div className={classes.handle} />
        <hr/>
            <Skeleton variant="text" />
        <hr/>                      
        </div>
    </div>
    <div className={classes.profile} style={{marginBottom:10}}>
        <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-images"/>                                              
        </div>                    
        <hr/>
        <div className="profile-details">
            <div className={classes.handle} />
        <hr/>
            <Skeleton variant="text" />
        <hr/>                      
        </div>
    </div>
    <div className={classes.profile} style={{marginBottom:10}}>
        <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-images"/>                                              
        </div>                    
        <hr/>
        <div className="profile-details">
            <div className={classes.handle} />
        <hr/>
            <Skeleton variant="text" />
        <hr/>                      
        </div>
    </div>
    <div className={classes.profile} style={{marginBottom:10}}>
        <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-images"/>                                              
        </div>                    
        <hr/>
        <div className="profile-details">
            <div className={classes.handle} />
        <hr/>
            <Skeleton variant="text" />
        <hr/>                      
        </div>
    </div>
    <div className={classes.profile} style={{marginBottom:10}}>
        <div className="image-wrapper">
            <img src={NoImg} alt="profile" className="profile-images"/>                                              
        </div>                    
        <hr/>
        <div className="profile-details">
            <div className={classes.handle} />
        <hr/>
            <Skeleton variant="text" />
        <hr/>                      
        </div>
    </div>
    </Paper>
  );
};

MiniProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MiniProfileSkeleton);

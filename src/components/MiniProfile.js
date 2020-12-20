import React, { Component,Fragment } from 'react';
import propStypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';


import {connect} from 'react-redux';
import {Paper } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import MiniProfileSkeleton from '../util/MiniProfileSkeleton';

import { getAllUsers } from '../redux/actions/dataActions';


const styles = (theme) => ({
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


class MiniProfile extends Component {
    componentDidMount(){
        this.props.getAllUsers();
    }
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    render() {
        const {classes,user:{credentials:{handle,imageUrl,bio},loading,authenticated}} = this.props;
        const {users} = this.props.data;
        console.log('users',users)
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>                                              
                    </div>                    
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="body2">
                            {handle}
                        </MuiLink>
                    <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                    <hr/>                      
                    </div>
                </div>
                <div>
                    <p style={{fontSize:'13px',fontWeight:650,color:'#BDBDBD'}}>Thành viên mới</p>
                    {
                        users.slice(0,5).map(user =>{
                            return(
                            <div className={classes.profile} style={{marginBottom:10}}>
                                <div className="image-wrapper">
                                    <img src={user.imageUrl} alt="profile" className="profile-images"/>                                              
                                </div>                    
                                <hr/>
                                <div className="profile-details">
                                    <MuiLink component={Link} to={`/users/${user.handle}`} color="primary" variant="body2">
                                        {user.handle}
                                    </MuiLink>
                                <hr/>
                                    {bio && <Typography variant="body2" style={{fontSize:12}}>{user.bio}</Typography>}
                                <hr/>                      
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">Không tìm thấy hồ sơ người dùng, hãy đăng nhập lại!</Typography>
            </Paper>
        )) : (<MiniProfileSkeleton/>)
        return profileMarkup;
    }
}

const mapStateToProps = (state) =>({
    user:state.user,
    data:state.data
});

const mapActionsToProps = {getAllUsers};

MiniProfile.propStypes = {
    getAllUsers:propStypes.func.isRequired,
    user: propStypes.object.isRequired,
    data:propStypes.object.isRequired,
    classes: propStypes.object.isRequired
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(MiniProfile))

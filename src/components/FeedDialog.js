import React, { Component,Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';

import CloseIcon from '@material-ui/icons/Close';

import {connect} from 'react-redux';
import {getFeed,clearErrors} from '../redux/actions/dataActions'

import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const styles = theme =>({
    ...theme.spreadThis,    
    profileImage:{
        width: 100,
        height:100,
        borderRadius: '50%',
        objectFit:'cover'
    },
    dialogContent:{
        padding:20
    },
    closeButton:{
        position:'absolute',
        left:'90%'
    },
    expandButton:{
        position:'absolute',
        left:'67%'
    },
    spinnerDiv:{
        textAlign:'center',
        marginTop:50,
        marginBottom:50
    },
    media:{
        height:'700px',
    }
})

class FeedDialog extends Component{
    state={
        open:false,
        oldPath:'',
        newPath:''
    };
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen(); 
        }
    };
    handleOpen = () =>{
        let oldPath = window.location.pathname;

        const {userHandle, feedId} = this.props;
        const newPath = `/users/${userHandle}/feed/${feedId}`;

        if(oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null,null,newPath);

        this.setState({open:true,oldPath,newPath});
        this.props.getFeed(this.props.feedId);
    };
    handleClose = () =>{
        window.history.pushState(null,null,this.state.oldPath);
        this.setState({open:false});
        this.props.clearErrors();
    };
    render(){
        const {classes,feed:{feedId,body,createdAt, likeCount,commentCount,userImage,userHandle,comments,feedImage},UI:{loading}}
        = this.props;
        const dialogMarkupContent = !feedImage ? (
            <Grid container spacing={16}>
                <Grid item sm={3}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton feedId={feedId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comment">
                        <ChatIcon color="primary"/>
                    </MyButton>                    
                    <span>{commentCount} Comments</span>
                    <hr className={classes.invisibleSeparator}/>
                </Grid>              
                <hr className={classes.visibleSeparator}/>                
                <CommentForm feedId={feedId}/>
                <Comments comments={comments}/>
            </Grid>
        ):(
            <Grid container spacing={16}>
                <Grid item sm={3}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton feedId={feedId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comment">
                        <ChatIcon color="primary"/>
                    </MyButton>                    
                    <span>{commentCount} Comments</span>
                    <hr className={classes.invisibleSeparator}/>
                </Grid>
                <img src={feedImage} alt="Feed Image" className={classes.media}/>                
                <hr className={classes.visibleSeparator}/>                
                <CommentForm feedId={feedId}/>
                <Comments comments={comments}/>
            </Grid>
        );
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ): dialogMarkupContent;
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand feed" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

FeedDialog.propTypes = {
    clearErrors:propTypes.func.isRequired,
    getFeed:propTypes.func.isRequired,
    feedId:propTypes.string.isRequired,
    userHandle: propTypes.string.isRequired,
    feed: propTypes.object.isRequired,
    UI:propTypes.object.isRequired
}

const mapStateToProps = state =>({
    feed: state.data.feed,
    UI:state.UI
})

const mapActionsToProps = {
    getFeed,clearErrors
}

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(FeedDialog))
import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import propTypes from 'prop-types';
import MyButton from '../util/MyButton';

import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import {connect} from 'react-redux';

import DeleteFeed from './DeleteFeed';
import FeedDialog from './FeedDialog';
import LikeButton from './LikeButton';

const styles = {
    card:{
        marginBottom: 15
        
    },
    content:{
        padding: 20,

    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
      }
};
    


class Feed extends Component {    
    render() {
        dayjs.extend(relativeTime);
        const {classes,feed:{body, createdAt,userImage,userHandle,feedId,likeCount,commentCount,feedImage},user:{authenticated,credentials:{handle}}}=this.props;
        

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteFeed feedId={feedId}/>
        ): null;

        const FeedMarkup = !feedImage ? (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={userImage}>                        
                    </Avatar>
                    }
                    action={
                        <div>
                            {deleteButton}
                        </div>
                      }
                    title={<Typography variant="body1" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>}
                    subheader={dayjs(createdAt).fromNow()}
                />                  
                <CardContent className={classes.content}>                    
                    <Typography variant="body1" color="textSecondary" component="p">{body}</Typography>                
                    <LikeButton feedId={feedId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="Comment">
                        <ChatIcon color="primary"/>
                    </MyButton> 
                    <span>{commentCount} Comments</span>
                    <FeedDialog feedId={feedId} userHandle={userHandle} openDialog={this.props.openDialog}/>                                      
                </CardContent>
            </Card>
        ):(
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar} src={userImage}>                        
                    </Avatar>
                    }
                    action={
                        <div>
                            {deleteButton}
                        </div>
                      }
                    title={<Typography variant="body1" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>}
                    subheader={dayjs(createdAt).fromNow()}
                />                  
                <CardContent className={classes.content}>                    
                    <Typography variant="body1" color="textSecondary" component="p">{body}</Typography>
                    <br/>
                    <CardMedia
                        className={classes.media}
                        image={feedImage}
                        title={body}
                    />                    
                    <LikeButton feedId={feedId}/>
                    <span>{likeCount} Likes</span>
                    <MyButton tip="Comment">
                        <ChatIcon color="primary"/>
                    </MyButton> 
                    <span>{commentCount} Comments</span>
                    <FeedDialog feedId={feedId} userHandle={userHandle} openDialog={this.props.openDialog}/>                                      
                </CardContent>
            </Card>
        )   

        return FeedMarkup;
    }
}

Feed.propTypes = {
    user:propTypes.object.isRequired,
    feed:propTypes.object.isRequired,
    classes:propTypes.object.isRequired,
    openDialog: propTypes.bool
}

const mapStateToProps = state =>({
    user: state.user
})



export default connect(mapStateToProps)(withStyles(styles)(Feed)); 

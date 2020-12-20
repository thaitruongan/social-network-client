import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import {Link} from 'react-router-dom';
import propTypes from 'prop-types';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import {connect} from 'react-redux';
import {likeFeed,unlikeFeed} from '../redux/actions/dataActions';

export class LikeButton extends Component {
    likedFeed = () =>{
        if(this.props.user.likes && this.props.user.likes.find(like =>like.feedId === this.props.feedId))
        return true;
        else
        return false;
    };
    likeFeed = () =>{
        this.props.likeFeed(this.props.feedId);
    };
    unlikeFeed = () =>{
        this.props.unlikeFeed(this.props.feedId);
    };
    render() {
        const {authenticated}= this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/">
                <MyButton tip="Like">
                    <FavoriteBorderIcon color="primary"/>
                </MyButton>
            </Link>
            ) : (
                this.likedFeed() ? (
                    <MyButton tip="Undo like" onClick={this.unlikeFeed}>
                        <FavoriteIcon color="primary"/>
                    </MyButton>
                ) : (
                    <MyButton tip="Like" onClick={this.likeFeed}>
                        <FavoriteBorderIcon color="primary"/>
                    </MyButton>
                )
            );
        return likeButton
    }
}

LikeButton.propTypes = {
    user:propTypes.object.isRequired,
    feedId: propTypes.string.isRequired,
    likeFeed: propTypes.func.isRequired,
    unlikeFeed: propTypes.func.isRequired,
}

const mapStateToProps = state =>({
    user: state.user
})

const mapActionsToProps ={
    likeFeed,
    unlikeFeed
};

export default connect(mapStateToProps,mapActionsToProps)(LikeButton)

import React, { Component } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Feed from '../components/Feed';
import NavBarProfile from '../components/NavbarProfile';
import StaticProfile from '../components/StaticProfile'
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';
import {getUserData} from '../redux/actions/dataActions';
import FeedSkeleton from '../util/FeedSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

const styles = (theme) =>({
    ...theme.spreadThis,    
})

class user extends Component {
    state = {
        profile: null,
        feedIdParam: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const feedId = this.props.match.params.feedId;

        if(feedId) this.setState({feedIdParam: feedId });

        this.props.getUserData(handle);
        axios.get(`/user/${handle}`)
        .then(res=>{
            this.setState({
                profile:res.data.user
            })
        })
        .catch(err =>console.log(err));
    }
    render() {
        const {feeds,loading} = this.props.data;
        console.log("1",feeds)
        const {feedIdParam} = this.state;
        const feedsMarkup = loading ? (
            <FeedSkeleton/>
        ): feeds === null ? (
            <p>No feeds from this user </p>
        ): !feedIdParam ? (
            feeds.map(feed => <Feed key={feed.feedId} feed={feed}/>)
        ):(
            feeds.map(feed =>{
                if(feed.feedId !== feedIdParam)
                return <Feed key={feed.feedId} feed={feed}/>
                else return <Feed key={feed.feedId} feed={feed} openDialog/>
            })
        )
        return (
            <div>
                <NavBarProfile/>
                <div className="container">        
                    <Grid container spacing={2}>
                        <Grid item sm={5} xs={12}>
                            {this.state.profile === null ?(
                                <ProfileSkeleton/>
                            ):(
                                <StaticProfile profile={this.state.profile}/>
                            )}
                        </Grid>
                        <Grid item sm={7} xs={12}>
                            {feedsMarkup}
                        </Grid>
                    </Grid>
                </div>
            </div> 
        )
    }
}

user.propTypes = {
    getUserData: propTypes.func.isRequired,
    data:propTypes.object.isRequired,
    classes:propTypes.object.isRequired
}

const mapStateToProps = state => ({
    data:state.data
})

export default connect(mapStateToProps,{getUserData})(withStyles(styles)(user))

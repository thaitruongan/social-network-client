import { colors, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import Feed from '../components/Feed';
import NavBar from '../components/NavBar'
import propTypes from 'prop-types';
import MiniProfile from '../components/MiniProfile';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {connect} from 'react-redux';
import {getFeeds} from '../redux/actions/dataActions'
import FeedSkeleton from '../util/FeedSkeleton';


class home extends Component {
    componentDidMount(){
        this.props.getFeeds();
    }
    render() {
        const {feeds,loading} = this.props.data;
        const {authenticated} = this.props;
        let recentFeedsMarkup = !loading ? ((authenticated ? (
            feeds.map(feed => <Feed key={feed.feedId} feed={feed}/>) 
        ):(
        <Paper>
            <Typography variant="body2" align="center">Không tìm thấy hồ sơ người dùng, hãy đăng nhập lại!</Typography>
        </Paper>))
           
        ): (
        <FeedSkeleton/>
        );
        return (
            <div>
                <NavBar/>
                <div className="container">        
                    <Grid container spacing={2}>                
                        <Grid item sm={2} xs={12}>
                            
                        </Grid>
                        <Grid item sm={7} xs={12}>
                            {recentFeedsMarkup}
                        </Grid>
                        <Grid item sm={3} xs={12}>
                            <MiniProfile/>
                            <br/>
                            <div>
                                <p style={{fontSize:12,color:'#BDBDBD'}}>© 2020 SOCIAL NETWORK</p>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

home.propTypes = {
    getFeeds: propTypes.func.isRequired,
    data: propTypes.object.isRequired,
    authenticated:propTypes.bool.isRequired
} 

const mapStateToProps = state =>({
    data:state.data,
    authenticated:state.user.authenticated
})

export default connect(mapStateToProps,{getFeeds})(home);

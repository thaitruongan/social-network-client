import React, { Component,Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import propTypes from 'prop-types';
import MyButton from '../util/MyButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

import {connect} from 'react-redux';
import {deleteFeed} from '../redux/actions/dataActions';

const styles = {
    deleteButton:{
        marginLeft: 10
    }
};

class DeleteFeed extends Component {
    state = {
        open:false
    };
    handleOpen = () =>{
        this.setState({open:true});
    }
    handleClose = () =>{
        this.setState({open:false});
    }
    deleteFeed = () =>{
        this.props.deleteFeed(this.props.feedId);
        this.setState({open:false});
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton
                tip="Delete Scream"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Are you sure you want to delete this feed ?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.deleteFeed} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>                
            </Fragment>
        )
    }
}

DeleteFeed.propTypes = {
    deleteFeed:propTypes.func.isRequired,
    classes:propTypes.object.isRequired,
    feedId: propTypes.string.isRequired
}

export default connect(null,{deleteFeed})(withStyles(styles)(DeleteFeed))

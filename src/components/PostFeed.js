import React, { Component,Fragment } from 'react';
import propTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { IconButton, Tooltip } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ImageIcon from '@material-ui/icons/Image';

import {connect} from 'react-redux';
import {postFeed,clearErrors} from '../redux/actions/dataActions';

const styles = (theme) =>({
    ...theme.spreadThis,
    submitButton:{
        position:'relative',
        float:'right',
        marginTop: 10
    },
    progressSpinner:{
        position:'absolute'
    },
    closeButton:{
        position:'absolute',
        left:'90%',
        top:'10%'
    },
    colorButton:{
        color:'#fff',
    },
    feedImage:{
        width: 100,
        height:100,
        objectFit:'cover'
    }
});

class PostFeed extends Component{    
    state = {
        open:false,
        body:'',
        errors:{},
        feedImage:''
    };    
    
    componentWillReceiveProps (nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps.UI.errors
            });
        };
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body:'',open:false, errors:{}});
        }
    }
    handleOpen = ()=>{
        this.setState({open:true})
    }
    handleClose = () =>{
        this.props.clearErrors();
        this.setState({open:false, errors:{}})
    }
    handleChange = (event) =>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', this.state.feedImage,this.state.feedImage.name);
        formData.append('body',this.state.body)
        this.props.postFeed(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }
    handleImageChange = (event) => {
        const image = event.target.files[0];

        if(image)
        {
            const reader = new FileReader();
            reader.addEventListener("load", function(){
                console.log(this);
                const previewImage = document.getElementById("image-preview");
                previewImage.setAttribute("src",this.result);               
            });
            reader.readAsDataURL(image);            
        }
        this.setState({feedImage:image});
    };
    render(){
        const {errors} = this.state;
        console.log("hi",this.state.feedImage);
        const {classes,UI:{loading}} = this.props;
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Feed!">
                    <AddIcon className={classes.colorButton}/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>
                        Post a new feed
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text" label="FEED!!" multiline rows="3" placeholder="Feed at your fellow friends" 
                            error={errors.body ? true:false} helperText={errors.body} className={classes.TextField} 
                            onChange={this.handleChange} fullWidth/>
                            <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                            <Tooltip title="Edit profile picture" placeholder="top">
                                <IconButton onClick={this.handleEditPicture} className="button">
                                    <ImageIcon color="primary"/>
                                </IconButton>
                            </Tooltip>
                            <br/>
                            <img src="" className={classes.feedImage} id="image-preview"/>
                            <br/>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner}/>
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

PostFeed.propTypes = {
    postFeed:propTypes.func.isRequired,
    clearErrors:propTypes.func.isRequired,
    UI:propTypes.object.isRequired
};

const mapStateToProps = state =>({
    UI:state.UI
});

export default connect(mapStateToProps,{postFeed,clearErrors})(withStyles(styles)(PostFeed))
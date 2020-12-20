import React, {Component} from 'react'
import propTypes from 'prop-types';
import withStyle from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField  from '@material-ui/core/TextField';

import {connect} from 'react-redux';
import {submitComment} from '../redux/actions/dataActions';


const styles = (theme) =>({
    ...theme.spreadThis,

})

class CommentFrom extends Component{
    state = {
        body:'',
        errors : {}
    }
 
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors});
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:''})
        }
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.feedId,{body:this.state.body});

    }

    render(){
        const {classes, authenticated} = this.props;
        const errors = this.state.errors;
        const commentFromMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name = "body" type="text" label="Comment on feed" error={errors.comment ? true : false} 
                    helperText={errors.comment} value={this.state.body} onChange={this.handleChange} fullWidth className={classes.textField}/>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>Submit</Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null 
        return commentFromMarkup;
    }
}

CommentFrom.propTypes = {
    submitComment:propTypes.func.isRequired,
    UI:propTypes.object.isRequired,
    classes: propTypes.object.isRequired,
    feedId:propTypes.string.isRequired,
    authenticated:propTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    UI:state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps,{submitComment})(withStyle(styles)(CommentFrom))
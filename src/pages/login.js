import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom' 


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions';

const styles = (theme) =>({
    ...theme.spreadThis
});

class login extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            errors:{}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();        
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData,this.props.history);        
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {classes,UI:{ loading }} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.banner}>
                <Grid item sm={8} xs={12}>                                       
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Card className="card">
                        <CardContent>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField variant="outlined" id="email" name="email" type="email" label="Email" className={classes.TextField} helperText={errors.email} error={errors.email ? true : false} 
                                value={this.state.email} onChange={this.handleChange} fullWidth/>
                                <TextField variant="outlined"id="password" name="password" type="password" label="Mật khẩu" className={classes.TextField} helperText={errors.password} error={errors.password ? true : false}
                                value={this.state.password} onChange={this.handleChange} fullWidth/>
                                {errors.general && (
                                    <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                                )}
                                <small><Link to="/resetpassword" style={{textDecoration:'none',color:'#33c9dc'}}>Quên mật khẩu?</Link></small>
                                <br/>
                                <Button type="submit" variant="contained" color="primary"  className={classes.button} disabled={loading}>Đăng nhập
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                                </Button>
                                <br/>
                                <br/>
                                <small>Bạn không có tài khoản ?<Link to="/signup" style={{textDecoration:'none',color:'#33c9dc'}}> Đăng ký</Link></small>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

login.propTypes = {
    classes: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    UI: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
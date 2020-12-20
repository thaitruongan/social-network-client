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
import {resetPassword} from '../redux/actions/userActions';

const styles = (theme) =>({
    ...theme.spreadThis
});

class resetpassword extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            notification:'Vui lòng nhập email để lấy lại mật khẩu'
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();        
        const userData = {
            email:this.state.email
        };
        this.props.resetPassword(userData);
        this.setState({notification:'Email lấy lại mật khẩu đã được gửi đi vui lòng kiểm tra hộp thư'})        
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.banner}>
                <Grid item sm={8} xs={12}>                                       
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Card className="card">
                        <CardContent>
                            <form noValidate onSubmit={this.handleSubmit}>                                
                                <TextField variant="outlined" id="email" name="email" type="email" label="Email" className={classes.TextField}
                                value={this.state.email} onChange={this.handleChange} fullWidth/>
                                <br/>
                                <small style={{color:'#33c9dc'}}>{this.state.notification}</small>
                                <br/>
                                <Button type="submit" variant="contained" color="primary"  className={classes.button}>Gửi                                
                                </Button>
                                <br/>
                                <br/>
                                <small style={{cursor:'pointer',color:'#33c9dc'}} onClick={()=>window.location.href = '/'}>Quay lại trang đăng nhập</small>
                                <br/>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

resetpassword.propTypes = {
    classes: propTypes.object.isRequired,
    resetPassword: propTypes.func.isRequired,
    user: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    resetPassword
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(resetpassword));
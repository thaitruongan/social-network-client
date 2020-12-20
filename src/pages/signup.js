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

import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions'

const styles = (theme) =>({
    ...theme.spreadThis
});

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            confirmPassword:'',
            handle:'',
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
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle:this.state.handle

        };
        this.props.signupUser(newUserData,this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render() {
        const {classes,UI:{loading}} = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.banner}>
                <Grid item sm={8} xs={12}>                                       
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Card className="card-signup">
                        <CardContent>
                            <form noValidate onSubmit={this.handleSubmit}>
                                <TextField variant="outlined" id="handle" name="handle" type="text" label="Tên đầy đủ" className={classes.TextField} helperText={errors.handle} error={errors.handle ? true : false} 
                                value={this.state.handle} onChange={this.handleChange} fullWidth/>
                                {errors.general && (
                                    <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                                )}
                                <TextField variant="outlined" id="email" name="email" type="email" label="Email" className={classes.TextField} helperText={errors.email} error={errors.email ? true : false} 
                                value={this.state.email} onChange={this.handleChange} fullWidth/>
                                <TextField variant="outlined"id="password" name="password" type="password" label="Mật khẩu" className={classes.TextField} helperText={errors.password} error={errors.password ? true : false}
                                value={this.state.password} onChange={this.handleChange} fullWidth/>                                
                                <TextField variant="outlined"id="confirmPassword" name="confirmPassword" type="password" label="Nhập lại mật khẩu" className={classes.TextField} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}
                                value={this.state.confirmPassword} onChange={this.handleChange} fullWidth/>
                                <Typography variant="body2">Bằng cách đăng ký, bạn đồng ý với Điều khoản, Chính sách dữ liệu và Chính sách cookie của chúng tôi.</Typography>
                                <Button type="submit" variant="contained" color="primary"  className={classes.button} disabled={loading}>Đăng ký
                                {loading && (
                                    <CircularProgress size={30} className={classes.progress}/>
                                )}
                                </Button>
                                <br/>
                                <br/>
                                <small>Bạn có tài khoản ?<Link to="/" style={{textDecoration:'none',color:'#33c9dc'}}> Đăng nhập</Link></small>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

signup.propTypes = {
    classes: propTypes.object.isRequired,
    user: propTypes.object.isRequired,
    UI: propTypes.object.isRequired,
    signupUser: propTypes.func.isRequired
};

const mapStateToProps = (state) =>({
    user:state.user,
    UI: state.UI
})


export default connect(mapStateToProps, {signupUser})(withStyles(styles)(signup));
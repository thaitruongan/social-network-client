import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import NavBarProfile from '../components/NavbarProfile';
import Profile from '../components/Profile';
class personalpage extends Component {    
    render() {
        return (
            <div>
                <NavBarProfile/>
                <div className="container">        
                    <Grid container spacing={2}>
                        <Grid item sm={1} xs={12}>                            
                        </Grid>
                        <Grid item sm={10} xs={12}>
                            <Profile/>
                        </Grid>
                        <Grid item sm={1} xs={12}>
                        </Grid>
                    </Grid>
                </div>
            </div>            
        )
    }
}

export default personalpage
import React,{Fragment} from 'react';
import propTypes from 'prop-types'
import NoImg from '../images/no-img.png';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

import withStyles from '@material-ui/core/styles/withStyles';
import { CardHeader } from '@material-ui/core';

const styles = theme =>({
    ...theme.spreadThis,
    card:{
        marginBottom: 15
        
    },
    content:{
        padding: 20,

    },
    handle:{
        width: 120,
        height:15,
        backgroundColor:theme.palette.primary.main,
    },
    date: {
        height: 10,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 10,
        marginTop:5
      },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0, 0.6)',
        marginBottom: 10
      }
});

const FeedSkeleton = (props) =>{
    const {classes} = props;

    const content = Array.from({ length: 5 }).map((item, index) =>(
        <Card className={classes.card} key={index}>
            <CardHeader
            avatar={
                <Avatar src={NoImg}>                    
                </Avatar>
                }
                title={<Typography variant="body1" className={classes.handle}></Typography>}
                subheader={<Typography variant="body1" className={classes.date}></Typography>}
            ></CardHeader>
            <CardContent className={classes.content}>
                <Skeleton variant="rect" width={'100%'} height={118} />
            </CardContent>  
        </Card>
    ))

    return <Fragment>{content}</Fragment>
}

FeedSkeleton.propTypes ={
    classes: propTypes.object.isRequired
}

export default withStyles(styles)(FeedSkeleton)
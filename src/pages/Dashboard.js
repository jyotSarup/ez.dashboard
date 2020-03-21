import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GraphContainer from '../components/GraphContainer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // height:"150vh"
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: '50px 0'
  },
  title:{
    fontSize:"3.157em",
    fontWeight:"700",
    color:"#2B879E",
  }
}));
export default function CenteredGrid() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <Typography className={classes.title}>DASHBOARD</Typography>
      <GraphContainer></GraphContainer>
    </div>
  );
}


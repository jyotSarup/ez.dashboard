import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    flexGrow: 1,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: '16px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root} className="container">
      <Typography className="title">Realtors</Typography>
      <Paper className={classes.paper}>
        <Grid container spacing={1} className="viewGrid">
          <Grid item md={4}>image</Grid>
          <Grid item md>
            <div>Relator1</div>
            <div>xxx@gmail.com</div>
            <div>111-222-3333</div>
            <div>Burnaby</div>
            <Button variant="outlined" color="primary" className="blockBtn" component={Link} to={"/Realtors"}>Back</Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item md={4}>Home List1</Grid>
          <Grid item md={4}>Home List2</Grid>
          <Grid item md={4}>Home List3</Grid>
        </Grid>
      </Paper>
    </div>
  );
}
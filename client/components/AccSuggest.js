import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { HighestRated, OwnTopRated, Trending } from './Suggestions';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection:'column',
    marginTop:'25px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function AccSuggest(props) {
  const classes = useStyles();
  const {id} = props

  return (

    <div className={classes.root}>
      <div className='sidebarcontainer'>
        <Card className={classes.root}>
          <CardContent>
            <h2>Favorites</h2>
            <OwnTopRated id = {id}/>
          </CardContent>
        </Card>
      </div>
      <div className='sidebarcontainer'>
        <Card className={classes.root}>
          <CardContent>
            <h2>Trending</h2>
            <Trending />
          </CardContent>
        </Card>
      </div>
      <div className='sidebarcontainer'>
        <Card className={classes.root}>
          <CardContent>
            <h2>Top Rated</h2>
            <HighestRated />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

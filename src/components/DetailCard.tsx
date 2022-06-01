import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardMedia, Chip, Grid } from '@material-ui/core';
import { Stack } from '@mui/material';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
    padding: 16,
  },
  description: {
    height: 200,
  },
  pos: {
    marginBottom: 12,
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',
  },
  cardStyle: {
    width: 'auto',
    transitionDuration: '0.3s',
    height: '100%',
    margin: 16,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  cardMediaStyle: {
    objectFit: 'contain',
    height: '600',
  },
  footer: {
    fontSize: 16,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 'auto',
    cursor: 'pointer',
  },
});

type Props = {
  cardList: any;
};

export default function OutlinedCard({ cardList }: Props) {
  const classes = useStyles();
  const handleClick = (params: string) => {
    window.location.href = `https://anilist.co/anime/${params}`;
  };

  return (
    <Grid item xs={6} sm={4} md={2} key={cardList.id}>
      <Card className={classes.cardStyle} variant="outlined">
        <CardMedia
          className={classes.cardMediaStyle}
          component="img"
          image={cardList.coverImage.extraLarge}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {cardList.title.romaji}
          </Typography>
          <Typography variant="h5" component="h2" className={classes.title}>
            {cardList.averageScore}
          </Typography>
          <Grid container spacing={3} className={classes.pos}>
            <Stack direction="column" spacing={1}>
              {cardList.genres.map((items: string) => {
                return <Chip label={items} variant="outlined" />;
              })}
            </Stack>
          </Grid>
          <Typography
            className={classes.description}
            variant="body2"
            component="p"
            noWrap
          >
            {cardList.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.footer}>
          <Button onClick={() => handleClick(cardList.id)} size="small">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

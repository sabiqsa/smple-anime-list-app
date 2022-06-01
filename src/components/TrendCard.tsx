import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  gridList: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    justifyItems: 'start',
  },
  imgWrapper: {
    overflow: 'hidden',
    height: '100%',
    '&:hover': {
      transform: 'scale(1, 1)',
      cursor: 'pointer',
    },
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

type Props = {
  animeTrendList: any;
};

const handleClick = (params: string) => {
  window.location.href = params;
};

export default function TitlebarGridList({ animeTrendList }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={600} spacing={28} className={classes.gridList}>
        {animeTrendList.map((tile: any) => (
          <GridListTile
            key={tile.id}
            className={classes.imgWrapper}
            style={{ height: 350, width: 'auto', overflow: 'hidden' }}
            onClick={() => handleClick(tile.siteUrl)}
          >
            <img
              src={tile.coverImage.extraLarge}
              alt={tile.title.romaji}
              style={{ objectFit: 'contain', height: '100%' }}
            />
            <GridListTileBar
              title={tile.title.english}
              actionIcon={
                <IconButton
                  aria-label={`info about ${tile.title}`}
                  className={classes.icon}
                >
                  {tile.averageScore}
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

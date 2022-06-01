import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';

import { Grid } from '@material-ui/core';
import { GridSpacing } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Card from '../components/DetailCard';
import TrendCard from '../components/TrendCard';

type Props = {};

const useStyles = makeStyles({
  trendingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: '0 16px',
    justifyContent: 'center',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
  },
  titleTrending: {
    fontSize: 16,
    padding: 8,
  },
  footer: {
    fontSize: 16,
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    height: 'auto',
  },
  textSearch: {
    margin: 8,
  },
  title: {
    fontSize: 14,
  },
  description: {
    height: 200,
  },
  pos: {
    marginBottom: 12,
  },
  cardStyle: {
    width: 'auto',
    transitionDuration: '0.3s',
    height: '100%',
    margin: 16,
  },
});

const GET_ANIME = gql`
  {
    Page {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(sort: TRENDING_DESC) {
        coverImage {
          extraLarge
          medium
          large
          color
        }
        title {
          romaji
          english
          native
          userPreferred
        }
        type
        popularity
        averageScore
        genres
        isAdult
        source
        genres
        volumes
        episodes
        chapters
        siteUrl
        status
        meanScore
        popularity
        description
        favourites
        id
        characters(sort: FAVOURITES_DESC) {
          nodes {
            image {
              large
            }
            name {
              full
            }
            id
          }
        }
      }
    }
  }
`;

const GET_ANIME_TRENDING = gql`
  {
    Page {
      media(sort: TRENDING_DESC) {
        coverImage {
          extraLarge
          medium
          large
          color
        }
        title {
          romaji
          english
        }
        type
        popularity
        averageScore
        genres
        isAdult
        id
        siteUrl
      }
    }
  }
`;

export default function AnimeList({}: Props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_ANIME);
  const resTrending = useQuery(GET_ANIME_TRENDING);
  const [anime, setAnime] = useState([]);
  const [search, setSearch] = useState('');
  const [animeTrend, setAnimeTrend] = useState('');
  console.log('trending bestie', data);

  const animeDataList = data?.Page?.media;
  const animeTrendList = resTrending?.data?.Page?.media;

  useEffect(() => {
    if (data) {
      setAnime(animeDataList);
    }
    if (resTrending?.data) {
      setAnimeTrend(animeTrendList);
    }
  }, [data, resTrending.data]);

  useEffect(() => {
    let arr: any = [];
    if (data && search) {
      animeDataList.map((item: any) => {
        if (
          item.title.userPreferred.toLowerCase().includes(search.toLowerCase())
        ) {
          arr.push(item);
        }
      });
      setAnime(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Error Get Data ...</div>;
  }

  const onChange = (e: any) => {
    setSearch(e.target.value);
  };

  const getSearch = () => (
    <div className={classes.searchContainer}>
      <TextField
        id="standard-basic"
        variant="standard"
        value={search}
        onChange={onChange}
        className={classes.textSearch}
        placeholder="Search ..."
      />
    </div>
  );

  console.log('kenapa', anime);

  return (
    <>
      {getSearch()}
      {search && (
        <Grid container justify="center" spacing={Number(3) as GridSpacing}>
          {anime.length > 0 ? (
            anime?.map((item: any) => {
              return (
                <>
                  <Card cardList={item} />
                </>
              );
            })
          ) : (
            <div>Data Not Found ... </div>
          )}
        </Grid>
      )}
      <div className={classes.trendingContainer}>
        <Typography
          className={classes.titleTrending}
          color="textSecondary"
          gutterBottom
        >
          Trending Anime
        </Typography>
        <TrendCard animeTrendList={animeTrend.slice(0, 5)} />
      </div>
      <Typography className={classes.footer} color="textSecondary" gutterBottom>
        sabi
      </Typography>
    </>
  );
}

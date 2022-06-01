import React from 'react';
import './App.css';
import AnimeList from './container/AnimeList';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

function App() {
  const client: any = new ApolloClient({
    uri: 'https://graphql.anilist.co',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AnimeList />
      </div>
    </ApolloProvider>
  );
}

export default App;

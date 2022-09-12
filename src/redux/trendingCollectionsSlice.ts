import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApolloClient, InMemoryCache, gql, createHttpLink } from '@apollo/client'

export interface CollectionNode {
  address: string,
  name: string,
  stats: stats,
  symbol: string
}

export interface TrendingCollections {
  edges: Array<Edge>,
  pageInfo: any
}

export interface Edge {
  node: CollectionNode
}

export interface stats {
  totalSales: number,
  average: number,
  ceiling: number,
  floor: number,
  volume: number
}

const initialState: TrendingCollections = {
  edges: [],
  pageInfo: ''
}

const httpLink = createHttpLink({
  uri: "https://graphql.icy.tools/graphql",
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const perPage: number = 10

// TODO: compose query, add support for pagination, changing sort order, 
// changing sort direction, changing time period. Explore additional stats?
const trendingCollectionsQuery = gql`query TrendingCollections {
  trendingCollections(first: ${perPage}, orderBy: SALES, orderDirection: DESC, timePeriod: ONE_HOUR ) {
    edges {
      node {
        address
        ... on ERC721Contract {
          name
          stats {
            totalSales
            average
            ceiling
            floor
            volume
          }
          symbol
        }
      }
    } pageInfo {
      endCursor
    }
  }
}`;

export const getTrendingCollections = createAsyncThunk(
  'getTrendingCollections',
  async () => {
    const result = await client.query({query: trendingCollectionsQuery})
    return result;
  }
)

export const trendingCollectionSlice = createSlice({
  name: 'trendingCollection',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("HYDRATE", (state, action) => {
        console.log(action)
      })
      .addCase(getTrendingCollections.fulfilled, (state, action) => {
        state.edges = [...state.edges, ...action.payload.data.trendingCollections.edges]
      })
  },
})

export default trendingCollectionSlice.reducer

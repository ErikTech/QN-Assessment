import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

import trendingCollectionsReducer, {getTrendingCollections} from './trendingCollectionsSlice'
import walletConnectionReducer, {getWalletConnection} from './walletConnectionSlice'

export function makeStore() {
  return configureStore({
    reducer: { 
      trendingCollections: trendingCollectionsReducer,
      walletConnection: walletConnectionReducer,
    },
    devTools: { // TODO: return false if env != development
      // add actions to devtools 
      actionCreators: {
        getTrendingCollections,
        getWalletConnection,
      }
    }
  })
}

export const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// next + redux integration
export const wrapper = createWrapper(makeStore)

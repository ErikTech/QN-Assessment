import { useEffect } from 'react'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { TrendingCollections, getTrendingCollections } from '../redux/trendingCollectionsSlice'

import type { AppDispatch, AppState } from '../redux/store'

// Fetch trending collections once, get value from redux state and return it.
// Except during SSR in getServerSideProps, the initial data will be provided to the
// host component as props, so we provide a mechanism to short circuit.

// On the client, data always comes from redux state. 
// There's probably a better way to do this.
export const useTrendingCollections = (collectionData: TrendingCollections) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getTrendingCollections());
  }, []);

  return collectionData
    ? collectionData
    : useAppSelector((state) => state.trendingCollections);
}

// typed useDispatch and useSelector
// TODO: check if still needed

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

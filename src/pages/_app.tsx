import '../styles/globals.css'

import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import {wrapper} from '../redux/store'


function MyApp({ Component, pageProps }: AppProps) {
  const {store, props} = wrapper.useWrappedStore(pageProps)
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  )
}

export default MyApp;

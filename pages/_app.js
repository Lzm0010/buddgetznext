import Page from '../components/Page';
import {LineItemsProvider} from '../contexts/lineItemsContext';

function MyApp({ Component, pageProps }) {
  return (
    <LineItemsProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </LineItemsProvider>
  )
}

export default MyApp

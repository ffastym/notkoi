import ReactDOM from 'react-dom/client';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { client } from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { AppWrapper } from './AppWrapper';
// this manifest is used temporarily for development purposes
const manifestUrl = 'https://app.notkoi.site/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <ApolloProvider client={client}>
      <AppWrapper />
    </ApolloProvider>
  </TonConnectUIProvider>,
);

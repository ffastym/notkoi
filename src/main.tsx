import ReactDOM from 'react-dom/client';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { client } from './config/apollo';
import { ApolloProvider } from '@apollo/client';
import { AppWrapper } from './AppWrapper';
import 'buffer';
// this manifest is used temporarily for development purposes
const manifestUrl = 'https://app.notkoi.site/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl} actionsConfiguration={{ twaReturnUrl: import.meta.env.VITE_TWA_URL }}>
    <ApolloProvider client={client}>
      <AppWrapper />
    </ApolloProvider>
  </TonConnectUIProvider>,
);

import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { client } from './config/apollo';
import { ApolloProvider } from '@apollo/client';
// this manifest is used temporarily for development purposes
const manifestUrl = 'https://ffastym.github.io/notkoi/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </TonConnectUIProvider>,
);

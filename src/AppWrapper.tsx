import App from './App';
import { useApollo } from './apollo/useApollo';

export function AppWrapper() {
  useApollo();

  return <App />;
}

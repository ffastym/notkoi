import { useApollo } from './apollo/useApollo';
import App from './App';

export function AppWrapper() {
  useApollo();

  return <App />;
}

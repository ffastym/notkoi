import { useApollo } from './apollo/useApollo';
import { AppAuth } from './AppAuth';

export function AppWrapper() {
  useApollo();

  return <AppAuth />;
}

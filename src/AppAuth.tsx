import App from './App';
import { useLoginQuery } from './App.operations.generated';

export function AppAuth() {
  const { data, loading } = useLoginQuery({ fetchPolicy: 'cache-and-network' });

  return data ? <App user={data.login} /> : loading ? <span>LOADING</span> : <span>Not authorised</span>;
}

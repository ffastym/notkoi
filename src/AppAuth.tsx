import App from './App';
import { useLoginQuery } from './App.operations.generated';

export function AppAuth() {
  const { data, loading } = useLoginQuery({ fetchPolicy: 'no-cache' });

  return data ? <App user={data.login} /> : loading ? <span>LOADING</span> : <span>Nou authorised</span>;
}

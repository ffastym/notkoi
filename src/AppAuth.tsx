import App from './App';
import { useLoginQuery } from './App.operations.generated';

export function AppAuth() {
  const searchParams = new URLSearchParams(window.location.search);
  const referralCode = searchParams.get('tgWebAppStartParam');
  const { data, loading } = useLoginQuery({ fetchPolicy: 'cache-and-network', variables: { referralCode } });

  return data ? <App user={data.login} /> : loading ? <span>LOADING</span> : <span>Not authorised</span>;
}

import { FC } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, getRouteWithSlash } from './types/AppRoute';
import { useLoginQuery } from './App.operations.generated';
import { useJettonContract } from './hooks/useJettonContract';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Jetton from './pages/Jetton';

const App: FC = () => {
  const { data, loading } = useLoginQuery({ fetchPolicy: 'cache-and-network' });
  const { balance } = useJettonContract();

  if (!data) {
    return loading ? <span>LOADING</span> : <span>Not authorised</span>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={getRouteWithSlash(AppRoute.HOME)} element={<Home user={data.login} balance={balance} />} />
        <Route path={getRouteWithSlash(AppRoute.FRIENDS)} element={<Friends />} />
        <Route path={getRouteWithSlash(AppRoute.JETTON)} element={<Jetton user={data.login} balance={balance} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

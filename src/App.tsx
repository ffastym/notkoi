import { FC, lazy, ReactNode, Suspense } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, getRouteWithSlash } from './types/AppRoute';
import { useLoginQuery } from './App.operations.generated';
import Friends from './pages/Friends';
import Jetton from './pages/Jetton';

const Home = lazy(() => import('./pages/Home'));

const App: FC = () => {
  const { data, loading } = useLoginQuery({ fetchPolicy: 'cache-and-network' });
  const suspense = (children: ReactNode, fallback?: ReactNode) => (
    <Suspense fallback={fallback || <div>Loading...</div>}>{children}</Suspense>
  );

  if (!data) {
    return loading ? <span>LOADING</span> : <span>Not authorised</span>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={getRouteWithSlash(AppRoute.HOME)} element={suspense(<Home user={data.login} />)} />
        <Route path={getRouteWithSlash(AppRoute.FRIENDS)} element={suspense(<Friends />)} />
        <Route path={getRouteWithSlash(AppRoute.JETTON)} element={suspense(<Jetton user={data.login} />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

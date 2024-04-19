import { getLocality, isValidLocality } from '../common/utils/navUtils';

export enum AppRoute {
  HOME = '',
  PROFILE = 'profile',
  LEADERBOARD = 'leaderboard',
  FRIENDS = 'friends',
  JETTON = 'jetton',
}

export const getRouteWithSlash = (route: AppRoute, excludeLocality?: boolean): string => {
  const locality = getLocality();
  const defaultRoute = '/' + route;

  return excludeLocality ? defaultRoute : isValidLocality(locality) ? `/${locality}/${route}` : defaultRoute;
};

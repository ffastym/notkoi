import { ALLOWED_LOCALITIES, Locality } from '../../config';

export function getLocality(): Locality | undefined {
  const locality = new RegExp('\\/(.*?)\\/').exec(location.pathname);

  if (!locality) {
    return undefined;
  }

  const localityCode = locality[1] as Locality;

  return ALLOWED_LOCALITIES.includes(localityCode) ? localityCode : undefined;
}

export function getLocalitiesPaths(route: string): string[] {
  const paths = ALLOWED_LOCALITIES.map((locality) => `/${locality}` + route);

  paths.push(route);

  return paths;
}

export function isValidLocality(locality?: Locality) {
  return locality ? ALLOWED_LOCALITIES.includes(locality) : false;
}

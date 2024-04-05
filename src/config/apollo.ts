import { ApolloClient, InMemoryCache } from '@apollo/client';
import uniqBy from 'lodash.uniqby';
import { FieldPolicy } from '@apollo/client/cache/inmemory/policies';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';

export const urlGraphQLServer = 'http://localhost:3000/graphql'; //process.env.REACT_APP_BASE_URL_GRAPHQL;

export const urlGraphQLSubscriptions = 'ws://localhost:3000/graphql';

const defaultMergeOptions: FieldPolicy<any> = {
  keyArgs: false,
  merge(existing = [], incoming) {
    return uniqBy([...existing, ...incoming], '__ref');
  },
};

const getMergeOptionsWithCount = (key: string): FieldPolicy<any> => ({
  keyArgs: false,
  merge(existing, incoming) {
    let newData: {
      count: number;
      [key: string]: any;
    } = {
      count: 0,
      [key]: [],
    };

    if (existing) {
      newData = { ...existing };
    }

    if (incoming && 'count' in incoming && key in incoming) {
      newData.count = incoming.count;

      newData[key] =
        existing && key in existing ? uniqBy([...existing[key], ...incoming[key]], '__ref') : [...incoming[key]];
    }

    return newData;
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        companiesForSelect: defaultMergeOptions,
        skillsForSelect: defaultMergeOptions,
        locationsForSelect: defaultMergeOptions,
        myCandidates: defaultMergeOptions,
        companies: defaultMergeOptions,
        locationsOfActiveVacancies: getMergeOptionsWithCount('locations'),
        skillsOfActiveVacancies: getMergeOptionsWithCount('skills'),
        companiesWithActiveVacanciesSorSelect: getMergeOptionsWithCount('companies'),
      },
    },
  },
});

persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
});

export const client = new ApolloClient({
  uri: urlGraphQLServer,
  cache,
});

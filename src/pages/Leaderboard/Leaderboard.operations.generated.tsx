import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LeaderboardQueryVariables = Types.Exact<{ [key: string]: never }>;

export type LeaderboardQuery = {
  __typename?: 'Query';
  leaderboard: Array<{ __typename?: 'User'; id: string; fullName: string; coins: string }>;
};

export const LeaderboardDocument = gql`
  query Leaderboard {
    leaderboard {
      id
      fullName
      coins
    }
  }
`;

/**
 * __useLeaderboardQuery__
 *
 * To run a query within a React component, call `useLeaderboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useLeaderboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeaderboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useLeaderboardQuery(
  baseOptions?: Apollo.QueryHookOptions<LeaderboardQuery, LeaderboardQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, options);
}
export function useLeaderboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<LeaderboardQuery, LeaderboardQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LeaderboardQuery, LeaderboardQueryVariables>(LeaderboardDocument, options);
}
export type LeaderboardQueryHookResult = ReturnType<typeof useLeaderboardQuery>;
export type LeaderboardLazyQueryHookResult = ReturnType<typeof useLeaderboardLazyQuery>;
export type LeaderboardQueryResult = Apollo.QueryResult<LeaderboardQuery, LeaderboardQueryVariables>;

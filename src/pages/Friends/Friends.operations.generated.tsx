import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FriendsQuery = {
  __typename?: 'Query';
  friends: Array<{ __typename?: 'User'; id: string; fullName: string; coins: string }>;
};

export const FriendsDocument = gql`
  query Friends {
    friends {
      id
      fullName
      coins
    }
  }
`;

/**
 * __useFriendsQuery__
 *
 * To run a query within a React component, call `useFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsQuery(baseOptions?: Apollo.QueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
}
export function useFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FriendsQuery, FriendsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FriendsQuery, FriendsQueryVariables>(FriendsDocument, options);
}
export type FriendsQueryHookResult = ReturnType<typeof useFriendsQuery>;
export type FriendsLazyQueryHookResult = ReturnType<typeof useFriendsLazyQuery>;
export type FriendsQueryResult = Apollo.QueryResult<FriendsQuery, FriendsQueryVariables>;

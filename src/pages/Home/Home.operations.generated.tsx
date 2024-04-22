import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserProfileFragmentDoc } from '../../App.operations.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BitingSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type BitingSubscription = {
  __typename?: 'Subscription';
  biting: { __typename?: 'Biting'; id: string; power: number };
};

export type UserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserQuery = {
  __typename?: 'Query';
  user: { __typename?: 'User'; id: string; coins: string; tackleBoxId: string };
};

export const BitingDocument = gql`
  subscription Biting {
    biting {
      id
      power
    }
  }
`;

/**
 * __useBitingSubscription__
 *
 * To run a query within a React component, call `useBitingSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBitingSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBitingSubscription({
 *   variables: {
 *   },
 * });
 */
export function useBitingSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<BitingSubscription, BitingSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<BitingSubscription, BitingSubscriptionVariables>(BitingDocument, options);
}
export type BitingSubscriptionHookResult = ReturnType<typeof useBitingSubscription>;
export type BitingSubscriptionResult = Apollo.SubscriptionResult<BitingSubscription>;
export const UserDocument = gql`
  query User {
    user {
      ...UserProfile
    }
  }
  ${UserProfileFragmentDoc}
`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;

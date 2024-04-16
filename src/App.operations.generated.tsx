import * as Types from './generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BitingSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type BitingSubscription = {
  __typename?: 'Subscription';
  biting: { __typename?: 'Biting'; id: string; power: number };
};

export type LoginDataFragment = { __typename?: 'User'; id: string; coins: number; tackleBoxId: string };

export type UserProfileFragment = { __typename?: 'User'; id: string; referralCode: string };

export type LoginQueryVariables = Types.Exact<{ [key: string]: never }>;

export type LoginQuery = {
  __typename?: 'Query';
  login: { __typename?: 'User'; id: string; coins: number; tackleBoxId: string };
};

export type UserQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserQuery = { __typename?: 'Query'; user: { __typename?: 'User'; id: string; referralCode: string } };

export type ReferFriendMutationVariables = Types.Exact<{ [key: string]: never }>;

export type ReferFriendMutation = { __typename?: 'Mutation'; referFriend: boolean };

export type CatchedFishFragment = { __typename?: 'Fish'; id: number; name: string; price: number; picture: string };

export type CatchFishQueryVariables = Types.Exact<{
  bitingId: Types.Scalars['ID'];
}>;

export type CatchFishQuery = {
  __typename?: 'Query';
  catchFish: { __typename?: 'Fish'; id: number; name: string; price: number; picture: string };
};

export type SellFishMutationVariables = Types.Exact<{
  fishId: Types.Scalars['Float'];
}>;

export type SellFishMutation = { __typename?: 'Mutation'; sellFish: number };

export type FriendsCountQueryVariables = Types.Exact<{ [key: string]: never }>;

export type FriendsCountQuery = { __typename?: 'Query'; friendsCount: number };

export const LoginDataFragmentDoc = gql`
  fragment LoginData on User {
    id
    coins
    tackleBoxId
  }
`;
export const UserProfileFragmentDoc = gql`
  fragment UserProfile on User {
    id
    referralCode
  }
`;
export const CatchedFishFragmentDoc = gql`
  fragment CatchedFish on Fish {
    id
    name
    price
    picture
  }
`;
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
export const LoginDocument = gql`
  query Login {
    login {
      ...LoginData
    }
  }
  ${LoginDataFragmentDoc}
`;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *   },
 * });
 */
export function useLoginQuery(baseOptions?: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
}
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
}
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
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
export const ReferFriendDocument = gql`
  mutation ReferFriend {
    referFriend
  }
`;
export type ReferFriendMutationFn = Apollo.MutationFunction<ReferFriendMutation, ReferFriendMutationVariables>;

/**
 * __useReferFriendMutation__
 *
 * To run a mutation, you first call `useReferFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReferFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [referFriendMutation, { data, loading, error }] = useReferFriendMutation({
 *   variables: {
 *   },
 * });
 */
export function useReferFriendMutation(
  baseOptions?: Apollo.MutationHookOptions<ReferFriendMutation, ReferFriendMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReferFriendMutation, ReferFriendMutationVariables>(ReferFriendDocument, options);
}
export type ReferFriendMutationHookResult = ReturnType<typeof useReferFriendMutation>;
export type ReferFriendMutationResult = Apollo.MutationResult<ReferFriendMutation>;
export type ReferFriendMutationOptions = Apollo.BaseMutationOptions<ReferFriendMutation, ReferFriendMutationVariables>;
export const CatchFishDocument = gql`
  query CatchFish($bitingId: ID!) {
    catchFish(bitingId: $bitingId) {
      ...CatchedFish
    }
  }
  ${CatchedFishFragmentDoc}
`;

/**
 * __useCatchFishQuery__
 *
 * To run a query within a React component, call `useCatchFishQuery` and pass it any options that fit your needs.
 * When your component renders, `useCatchFishQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCatchFishQuery({
 *   variables: {
 *      bitingId: // value for 'bitingId'
 *   },
 * });
 */
export function useCatchFishQuery(baseOptions: Apollo.QueryHookOptions<CatchFishQuery, CatchFishQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CatchFishQuery, CatchFishQueryVariables>(CatchFishDocument, options);
}
export function useCatchFishLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CatchFishQuery, CatchFishQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CatchFishQuery, CatchFishQueryVariables>(CatchFishDocument, options);
}
export type CatchFishQueryHookResult = ReturnType<typeof useCatchFishQuery>;
export type CatchFishLazyQueryHookResult = ReturnType<typeof useCatchFishLazyQuery>;
export type CatchFishQueryResult = Apollo.QueryResult<CatchFishQuery, CatchFishQueryVariables>;
export const SellFishDocument = gql`
  mutation SellFish($fishId: Float!) {
    sellFish(fishId: $fishId)
  }
`;
export type SellFishMutationFn = Apollo.MutationFunction<SellFishMutation, SellFishMutationVariables>;

/**
 * __useSellFishMutation__
 *
 * To run a mutation, you first call `useSellFishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSellFishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sellFishMutation, { data, loading, error }] = useSellFishMutation({
 *   variables: {
 *      fishId: // value for 'fishId'
 *   },
 * });
 */
export function useSellFishMutation(
  baseOptions?: Apollo.MutationHookOptions<SellFishMutation, SellFishMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SellFishMutation, SellFishMutationVariables>(SellFishDocument, options);
}
export type SellFishMutationHookResult = ReturnType<typeof useSellFishMutation>;
export type SellFishMutationResult = Apollo.MutationResult<SellFishMutation>;
export type SellFishMutationOptions = Apollo.BaseMutationOptions<SellFishMutation, SellFishMutationVariables>;
export const FriendsCountDocument = gql`
  query FriendsCount {
    friendsCount
  }
`;

/**
 * __useFriendsCountQuery__
 *
 * To run a query within a React component, call `useFriendsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFriendsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFriendsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useFriendsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<FriendsCountQuery, FriendsCountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FriendsCountQuery, FriendsCountQueryVariables>(FriendsCountDocument, options);
}
export function useFriendsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FriendsCountQuery, FriendsCountQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FriendsCountQuery, FriendsCountQueryVariables>(FriendsCountDocument, options);
}
export type FriendsCountQueryHookResult = ReturnType<typeof useFriendsCountQuery>;
export type FriendsCountLazyQueryHookResult = ReturnType<typeof useFriendsCountLazyQuery>;
export type FriendsCountQueryResult = Apollo.QueryResult<FriendsCountQuery, FriendsCountQueryVariables>;

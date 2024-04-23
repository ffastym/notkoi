import * as Types from './generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserProfileFragment = { __typename?: 'User'; id: string; coins: string; tackleBoxId: string };

export type LoginQueryVariables = Types.Exact<{ [key: string]: never }>;

export type LoginQuery = {
  __typename?: 'Query';
  login: { __typename?: 'User'; id: string; coins: string; tackleBoxId: string };
};

export type ReferFriendMutationVariables = Types.Exact<{ [key: string]: never }>;

export type ReferFriendMutation = { __typename?: 'Mutation'; referFriend: boolean };

export type CatchedFishFragment = {
  __typename?: 'Fish';
  id: number;
  name: string;
  price: number;
  picture: string;
  type: Types.FishType;
};

export type BitingWithFishFragment = {
  __typename?: 'Biting';
  id: string;
  fish: { __typename?: 'Fish'; id: number; name: string; price: number; picture: string; type: Types.FishType };
};

export type CatchFishQueryVariables = Types.Exact<{
  bitingId: Types.Scalars['ID'];
}>;

export type CatchFishQuery = {
  __typename?: 'Query';
  catchFish: {
    __typename?: 'Biting';
    id: string;
    fish: { __typename?: 'Fish'; id: number; name: string; price: number; picture: string; type: Types.FishType };
  };
};

export type SellFishMutationVariables = Types.Exact<{
  bitingId: Types.Scalars['ID'];
}>;

export type SellFishMutation = { __typename?: 'Mutation'; sellFish: number };

export type ReleaseFishMutationVariables = Types.Exact<{
  bitingId: Types.Scalars['ID'];
}>;

export type ReleaseFishMutation = { __typename?: 'Mutation'; releaseFish: boolean };

export const UserProfileFragmentDoc = gql`
  fragment UserProfile on User {
    id
    coins
    tackleBoxId
  }
`;
export const CatchedFishFragmentDoc = gql`
  fragment CatchedFish on Fish {
    id
    name
    price
    picture
    type
  }
`;
export const BitingWithFishFragmentDoc = gql`
  fragment BitingWithFish on Biting {
    id
    fish {
      ...CatchedFish
    }
  }
  ${CatchedFishFragmentDoc}
`;
export const LoginDocument = gql`
  query Login {
    login {
      ...UserProfile
    }
  }
  ${UserProfileFragmentDoc}
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
      ...BitingWithFish
    }
  }
  ${BitingWithFishFragmentDoc}
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
  mutation SellFish($bitingId: ID!) {
    sellFish(bitingId: $bitingId)
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
 *      bitingId: // value for 'bitingId'
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
export const ReleaseFishDocument = gql`
  mutation ReleaseFish($bitingId: ID!) {
    releaseFish(bitingId: $bitingId)
  }
`;
export type ReleaseFishMutationFn = Apollo.MutationFunction<ReleaseFishMutation, ReleaseFishMutationVariables>;

/**
 * __useReleaseFishMutation__
 *
 * To run a mutation, you first call `useReleaseFishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReleaseFishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [releaseFishMutation, { data, loading, error }] = useReleaseFishMutation({
 *   variables: {
 *      bitingId: // value for 'bitingId'
 *   },
 * });
 */
export function useReleaseFishMutation(
  baseOptions?: Apollo.MutationHookOptions<ReleaseFishMutation, ReleaseFishMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReleaseFishMutation, ReleaseFishMutationVariables>(ReleaseFishDocument, options);
}
export type ReleaseFishMutationHookResult = ReturnType<typeof useReleaseFishMutation>;
export type ReleaseFishMutationResult = Apollo.MutationResult<ReleaseFishMutation>;
export type ReleaseFishMutationOptions = Apollo.BaseMutationOptions<ReleaseFishMutation, ReleaseFishMutationVariables>;

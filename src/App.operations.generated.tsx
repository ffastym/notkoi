import * as Types from './generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NewChatMessageSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type NewChatMessageSubscription = { __typename?: 'Subscription'; newChatMessage: number };

export type LoginDataFragment = { __typename?: 'User'; id: string; coins: number; tackleBoxId: string };

export type LoginQueryVariables = Types.Exact<{ [key: string]: never }>;

export type LoginQuery = {
  __typename?: 'Query';
  login: { __typename?: 'User'; id: string; coins: number; tackleBoxId: string };
};

export type CatchedFishFragment = { __typename?: 'Fish'; id: number; name: string; price: number; picture: string };

export type CatchFishQueryVariables = Types.Exact<{ [key: string]: never }>;

export type CatchFishQuery = {
  __typename?: 'Query';
  catchFish: { __typename?: 'Fish'; id: number; name: string; price: number; picture: string };
};

export type SellFishMutationVariables = Types.Exact<{
  fishId: Types.Scalars['Float'];
}>;

export type SellFishMutation = { __typename?: 'Mutation'; sellFish: number };

export const LoginDataFragmentDoc = gql`
  fragment LoginData on User {
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
  }
`;
export const NewChatMessageDocument = gql`
  subscription newChatMessage {
    newChatMessage
  }
`;

/**
 * __useNewChatMessageSubscription__
 *
 * To run a query within a React component, call `useNewChatMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewChatMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewChatMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewChatMessageSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<NewChatMessageSubscription, NewChatMessageSubscriptionVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<NewChatMessageSubscription, NewChatMessageSubscriptionVariables>(
    NewChatMessageDocument,
    options,
  );
}
export type NewChatMessageSubscriptionHookResult = ReturnType<typeof useNewChatMessageSubscription>;
export type NewChatMessageSubscriptionResult = Apollo.SubscriptionResult<NewChatMessageSubscription>;
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
export const CatchFishDocument = gql`
  query CatchFish {
    catchFish {
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
 *   },
 * });
 */
export function useCatchFishQuery(baseOptions?: Apollo.QueryHookOptions<CatchFishQuery, CatchFishQueryVariables>) {
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

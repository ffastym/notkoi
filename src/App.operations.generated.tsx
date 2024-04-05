import * as Types from './generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NewChatMessageSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type NewChatMessageSubscription = { __typename?: 'Subscription'; newChatMessage: boolean };

export type RnQueryVariables = Types.Exact<{
  input: Types.Scalars['String'];
}>;

export type RnQuery = { __typename?: 'Query'; releaseNotesV2?: string | null };

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
export const RnDocument = gql`
  query RN($input: String!) {
    releaseNotesV2(input: $input)
  }
`;

/**
 * __useRnQuery__
 *
 * To run a query within a React component, call `useRnQuery` and pass it any options that fit your needs.
 * When your component renders, `useRnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRnQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRnQuery(baseOptions: Apollo.QueryHookOptions<RnQuery, RnQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RnQuery, RnQueryVariables>(RnDocument, options);
}
export function useRnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RnQuery, RnQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RnQuery, RnQueryVariables>(RnDocument, options);
}
export type RnQueryHookResult = ReturnType<typeof useRnQuery>;
export type RnLazyQueryHookResult = ReturnType<typeof useRnLazyQuery>;
export type RnQueryResult = Apollo.QueryResult<RnQuery, RnQueryVariables>;

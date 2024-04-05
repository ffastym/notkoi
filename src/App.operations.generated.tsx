import * as Types from './generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NewChatMessageSubscriptionVariables = Types.Exact<{ [key: string]: never }>;

export type NewChatMessageSubscription = { __typename?: 'Subscription'; newChatMessage: boolean };

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

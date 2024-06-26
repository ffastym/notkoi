import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WithdrawMutationVariables = Types.Exact<{
  coins: Types.Scalars['String'];
}>;

export type WithdrawMutation = { __typename?: 'Mutation'; withdraw: string };

export const WithdrawDocument = gql`
  mutation Withdraw($coins: String!) {
    withdraw(coins: $coins)
  }
`;
export type WithdrawMutationFn = Apollo.MutationFunction<WithdrawMutation, WithdrawMutationVariables>;

/**
 * __useWithdrawMutation__
 *
 * To run a mutation, you first call `useWithdrawMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWithdrawMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [withdrawMutation, { data, loading, error }] = useWithdrawMutation({
 *   variables: {
 *      coins: // value for 'coins'
 *   },
 * });
 */
export function useWithdrawMutation(
  baseOptions?: Apollo.MutationHookOptions<WithdrawMutation, WithdrawMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<WithdrawMutation, WithdrawMutationVariables>(WithdrawDocument, options);
}
export type WithdrawMutationHookResult = ReturnType<typeof useWithdrawMutation>;
export type WithdrawMutationResult = Apollo.MutationResult<WithdrawMutation>;
export type WithdrawMutationOptions = Apollo.BaseMutationOptions<WithdrawMutation, WithdrawMutationVariables>;

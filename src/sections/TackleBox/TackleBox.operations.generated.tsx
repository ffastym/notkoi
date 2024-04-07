import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MainBoxFragment = {
  __typename?: 'Box';
  id: string;
  baitsLevel: number;
  baitsLevelUpdateTonCost: number;
  baitsLevelUpdateCoinsCost: number;
  baitsLevelUpdateForCoinsPossible: boolean;
  equipmentLevel: number;
  equipmentLevelUpdateForCoinsPossible: boolean;
  equipmentLevelUpdateTonCost: number;
  equipmentLevelUpdateCoinsCost: number;
};

export type TackleBoxQueryVariables = Types.Exact<{
  boxId: Types.Scalars['String'];
}>;

export type TackleBoxQuery = {
  __typename?: 'Query';
  tackleBox: {
    __typename?: 'Box';
    id: string;
    baitsLevel: number;
    baitsLevelUpdateTonCost: number;
    baitsLevelUpdateCoinsCost: number;
    baitsLevelUpdateForCoinsPossible: boolean;
    equipmentLevel: number;
    equipmentLevelUpdateForCoinsPossible: boolean;
    equipmentLevelUpdateTonCost: number;
    equipmentLevelUpdateCoinsCost: number;
  };
};

export type UpgradeBoxMutationVariables = Types.Exact<{
  boxId: Types.Scalars['ID'];
  boxItemType: Types.BoxItemType;
}>;

export type UpgradeBoxMutation = {
  __typename?: 'Mutation';
  upgradeBox: {
    __typename?: 'Box';
    id: string;
    baitsLevel: number;
    baitsLevelUpdateTonCost: number;
    baitsLevelUpdateCoinsCost: number;
    baitsLevelUpdateForCoinsPossible: boolean;
    equipmentLevel: number;
    equipmentLevelUpdateForCoinsPossible: boolean;
    equipmentLevelUpdateTonCost: number;
    equipmentLevelUpdateCoinsCost: number;
  };
};

export const MainBoxFragmentDoc = gql`
  fragment MainBox on Box {
    id
    baitsLevel
    baitsLevelUpdateTonCost
    baitsLevelUpdateCoinsCost
    baitsLevelUpdateForCoinsPossible
    equipmentLevel
    equipmentLevelUpdateForCoinsPossible
    equipmentLevelUpdateTonCost
    equipmentLevelUpdateCoinsCost
  }
`;
export const TackleBoxDocument = gql`
  query TackleBox($boxId: String!) {
    tackleBox(boxId: $boxId) {
      ...MainBox
    }
  }
  ${MainBoxFragmentDoc}
`;

/**
 * __useTackleBoxQuery__
 *
 * To run a query within a React component, call `useTackleBoxQuery` and pass it any options that fit your needs.
 * When your component renders, `useTackleBoxQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTackleBoxQuery({
 *   variables: {
 *      boxId: // value for 'boxId'
 *   },
 * });
 */
export function useTackleBoxQuery(baseOptions: Apollo.QueryHookOptions<TackleBoxQuery, TackleBoxQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TackleBoxQuery, TackleBoxQueryVariables>(TackleBoxDocument, options);
}
export function useTackleBoxLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TackleBoxQuery, TackleBoxQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TackleBoxQuery, TackleBoxQueryVariables>(TackleBoxDocument, options);
}
export type TackleBoxQueryHookResult = ReturnType<typeof useTackleBoxQuery>;
export type TackleBoxLazyQueryHookResult = ReturnType<typeof useTackleBoxLazyQuery>;
export type TackleBoxQueryResult = Apollo.QueryResult<TackleBoxQuery, TackleBoxQueryVariables>;
export const UpgradeBoxDocument = gql`
  mutation UpgradeBox($boxId: ID!, $boxItemType: BoxItemType!) {
    upgradeBox(boxId: $boxId, boxItemType: $boxItemType) {
      ...MainBox
    }
  }
  ${MainBoxFragmentDoc}
`;
export type UpgradeBoxMutationFn = Apollo.MutationFunction<UpgradeBoxMutation, UpgradeBoxMutationVariables>;

/**
 * __useUpgradeBoxMutation__
 *
 * To run a mutation, you first call `useUpgradeBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpgradeBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upgradeBoxMutation, { data, loading, error }] = useUpgradeBoxMutation({
 *   variables: {
 *      boxId: // value for 'boxId'
 *      boxItemType: // value for 'boxItemType'
 *   },
 * });
 */
export function useUpgradeBoxMutation(
  baseOptions?: Apollo.MutationHookOptions<UpgradeBoxMutation, UpgradeBoxMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpgradeBoxMutation, UpgradeBoxMutationVariables>(UpgradeBoxDocument, options);
}
export type UpgradeBoxMutationHookResult = ReturnType<typeof useUpgradeBoxMutation>;
export type UpgradeBoxMutationResult = Apollo.MutationResult<UpgradeBoxMutation>;
export type UpgradeBoxMutationOptions = Apollo.BaseMutationOptions<UpgradeBoxMutation, UpgradeBoxMutationVariables>;

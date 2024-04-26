import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FullAchievementFragment = {
  __typename?: 'Achievement';
  breakpoints: Array<number>;
  name: string;
  level: number;
  title: string;
};

export type AchievementsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type AchievementsQuery = {
  __typename?: 'Query';
  achievements: Array<{
    __typename?: 'Achievement';
    breakpoints: Array<number>;
    name: string;
    level: number;
    title: string;
  }>;
};

export const FullAchievementFragmentDoc = gql`
  fragment FullAchievement on Achievement {
    breakpoints
    name
    level
    title
  }
`;
export const AchievementsDocument = gql`
  query Achievements {
    achievements {
      ...FullAchievement
    }
  }
  ${FullAchievementFragmentDoc}
`;

/**
 * __useAchievementsQuery__
 *
 * To run a query within a React component, call `useAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAchievementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAchievementsQuery(
  baseOptions?: Apollo.QueryHookOptions<AchievementsQuery, AchievementsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AchievementsQuery, AchievementsQueryVariables>(AchievementsDocument, options);
}
export function useAchievementsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AchievementsQuery, AchievementsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AchievementsQuery, AchievementsQueryVariables>(AchievementsDocument, options);
}
export type AchievementsQueryHookResult = ReturnType<typeof useAchievementsQuery>;
export type AchievementsLazyQueryHookResult = ReturnType<typeof useAchievementsLazyQuery>;
export type AchievementsQueryResult = Apollo.QueryResult<AchievementsQuery, AchievementsQueryVariables>;

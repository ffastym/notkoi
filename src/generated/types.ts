export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Fish = {
  __typename?: 'Fish';
  createdAt: Scalars['Float'];
  deletedAt: Scalars['Float'];
  id: Scalars['Float'];
  name: Scalars['String'];
  picture: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  sellFish: Scalars['Boolean'];
};

export type MutationSellFishArgs = {
  fishId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  catchFish: Fish;
  login: User;
  releaseNotesV2?: Maybe<Scalars['String']>;
};

export type QueryReleaseNotesV2Args = {
  input: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newChatMessage: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  coins: Scalars['Float'];
  createdAt: Scalars['Float'];
  deletedAt: Scalars['Float'];
  first_name: Scalars['String'];
  id: Scalars['ID'];
  language_code: Scalars['String'];
  lastLoginDate: Scalars['DateTime'];
  last_name: Scalars['String'];
  telegramId: Scalars['Float'];
  updatedAt: Scalars['Float'];
  username: Scalars['String'];
};

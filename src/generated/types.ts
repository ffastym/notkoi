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

export type Biting = {
  __typename?: 'Biting';
  createdAt: Scalars['Float'];
  deletedAt: Scalars['Float'];
  fish: Fish;
  fishId: Scalars['String'];
  id: Scalars['ID'];
  power: Scalars['Float'];
  status: BitingStatus;
  updatedAt: Scalars['Float'];
  user: User;
  userId: Scalars['String'];
};

export enum BitingStatus {
  Missed = 'MISSED',
  Released = 'RELEASED',
  Sold = 'SOLD',
}

export type Box = {
  __typename?: 'Box';
  baitsLevel: Scalars['Float'];
  baitsLevelUpdateCoinsCost: Scalars['Float'];
  baitsLevelUpdateForCoinsPossible: Scalars['Boolean'];
  baitsLevelUpdateTonCost: Scalars['Float'];
  createdAt: Scalars['Float'];
  equipmentLevel: Scalars['Float'];
  equipmentLevelUpdateCoinsCost: Scalars['Float'];
  equipmentLevelUpdateForCoinsPossible: Scalars['Boolean'];
  equipmentLevelUpdateTonCost: Scalars['Float'];
  id: Scalars['ID'];
  updatedAt: Scalars['Float'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export enum BoxItemType {
  Baits = 'BAITS',
  Equipment = 'EQUIPMENT',
}

export type Fish = {
  __typename?: 'Fish';
  createdAt: Scalars['Float'];
  deletedAt: Scalars['Float'];
  id: Scalars['Float'];
  minBaitsLevel: Scalars['Float'];
  name: Scalars['String'];
  picture: Scalars['String'];
  power: Scalars['Float'];
  price: Scalars['Float'];
  type: FishType;
  updatedAt: Scalars['Float'];
};

export enum FishType {
  Fish = 'FISH',
  Nft = 'NFT',
}

export type HealthObjectType = {
  __typename?: 'HealthObjectType';
  status: Scalars['String'];
  timestamp: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  referFriend: Scalars['Boolean'];
  releaseFish: Scalars['Boolean'];
  sellFish: Scalars['Float'];
  upgradeBox: Box;
  withdraw: Scalars['String'];
};

export type MutationReleaseFishArgs = {
  bitingId: Scalars['ID'];
};

export type MutationSellFishArgs = {
  bitingId: Scalars['ID'];
};

export type MutationUpgradeBoxArgs = {
  boxId: Scalars['ID'];
  boxItemType: BoxItemType;
};

export type MutationWithdrawArgs = {
  coins: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  catchFish: Biting;
  friends: Array<User>;
  healthCheck: HealthObjectType;
  login: User;
  tackleBox: Box;
  user: User;
};

export type QueryCatchFishArgs = {
  bitingId: Scalars['ID'];
};

export type QueryTackleBoxArgs = {
  boxId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  biting: Biting;
};

export type User = {
  __typename?: 'User';
  coins: Scalars['String'];
  createdAt: Scalars['Float'];
  deletedAt: Scalars['Float'];
  first_name: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  language_code: Scalars['String'];
  lastLoginDate: Scalars['DateTime'];
  last_name: Scalars['String'];
  referralCode: Scalars['String'];
  tackleBox?: Maybe<Box>;
  tackleBoxId: Scalars['String'];
  telegramId: Scalars['String'];
  updatedAt: Scalars['Float'];
  username?: Maybe<Scalars['String']>;
};

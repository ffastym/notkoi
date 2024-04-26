import { FullAchievementFragment } from './Profile.operations.generated';

export type SelectedAchievement = FullAchievementFragment & {
  selectedLevel: number;
};

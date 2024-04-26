import { FullAchievementFragment } from '../../Profile.operations.generated';

export type AchievementProps = {
  achievement: FullAchievementFragment;
  onSelectAchievement: (_achievement: FullAchievementFragment, _selectedIndex: number) => void;
};

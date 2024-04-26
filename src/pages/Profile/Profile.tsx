import React, { FC, useCallback, useState } from 'react';

import { FlexBoxCol, PageWrapper } from '../../components/styled/styled';
import { SelectedAchievement } from './Profile.types';
import UserInfo from './components/UserInfo/UserInfo';
import Achievement from './components/Achievement';
import { ProfileAchievementDialog } from '../../sections/ProfileAchievementDialog';
import { formatPrice } from '../../common/utils/priceUtils';
import { FullAchievementFragment, useAchievementsQuery } from './Profile.operations.generated';

const Profile: FC = () => {
  const { data } = useAchievementsQuery({ fetchPolicy: 'cache-and-network' });
  const [selectedAchievement, setSelectedAchievement] = useState<SelectedAchievement | null>(null);
  const achievements = data?.achievements;

  const handleCloseAchievementsDialog = () => {
    setSelectedAchievement(null);
  };

  const handleShowAchievementsDialog = useCallback((achievement: FullAchievementFragment, selectedLevel: number) => {
    setSelectedAchievement({ ...achievement, selectedLevel });
  }, []);

  const getAchievementDescription = (achievement: SelectedAchievement) => {
    const breakpointIndex = achievement.selectedLevel - 1;

    switch (achievement.name) {
      case 'fisherman':
        return `Catch at all more that ${formatPrice(achievement.breakpoints[breakpointIndex])} fish`;
      case 'sportsmen':
        return `Release at all more that ${formatPrice(achievement.breakpoints[breakpointIndex])} fish`;
      case 'dealer':
        return `Earn at least ${formatPrice(achievement.breakpoints[breakpointIndex])} coins from fish selling`;
    }

    return null;
  };

  return (
    <PageWrapper>
      <UserInfo />
      <FlexBoxCol style={{ marginTop: 16 }}>
        <h1 style={{ marginBottom: -10 }}>Achievements</h1>
        {achievements?.map((achievement) => (
          <Achievement
            key={achievement.name}
            achievement={achievement}
            onSelectAchievement={handleShowAchievementsDialog}
          />
        ))}
      </FlexBoxCol>
      {selectedAchievement && (
        <ProfileAchievementDialog
          hide={handleCloseAchievementsDialog}
          title={selectedAchievement?.title}
          isVisible={!!selectedAchievement}
        >
          <div>{getAchievementDescription(selectedAchievement)}</div>
        </ProfileAchievementDialog>
      )}
    </PageWrapper>
  );
};

export default Profile;

import React, { FC, ReactElement, useCallback } from 'react';
import { FlexBoxCol, FlexBoxRow } from '../../../../components/styled/styled';
import Badge from './Badge';
import { AchievementProps } from './Achievement.types';

const Achievement: FC<AchievementProps> = (props) => {
  const {
    achievement: { title, level },
    onSelectAchievement,
  } = props;

  const onBadgeClick = useCallback(
    (badgeLevel: number) => {
      onSelectAchievement(props.achievement, badgeLevel);
    },
    [onSelectAchievement, props.achievement],
  );

  const renderBadges = () => {
    const badges: ReactElement[] = [];

    for (let i = 1; i <= 3; i++) {
      badges.push(<Badge key={i} isCompleted={level >= i} level={i} onClick={onBadgeClick} />);
    }

    return badges;
  };

  return (
    <FlexBoxCol>
      <h3 style={{ margin: '24px 0 0' }}>{title}</h3>
      <FlexBoxRow>{renderBadges()}</FlexBoxRow>
    </FlexBoxCol>
  );
};

export default Achievement;

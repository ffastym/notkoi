import React, { FC } from 'react';
import Lock from '../../../../components/Lock';

type BadgeProps = {
  level: number;
  isCompleted: boolean;
  onClick: (_badgeLevel: number) => void;
};

const levelsMapping = new Map([
  [1, 'I'],
  [2, 'II'],
  [3, 'III'],
  [4, 'IV'],
]);

const Badge: FC<BadgeProps> = ({ isCompleted, level, onClick }) => {
  const handleClickBadge = () => {
    onClick(level);
  };

  return (
    <div
      onClick={handleClickBadge}
      style={{
        opacity: isCompleted ? 1 : 0.5,
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img style={{ width: 'auto', maxHeight: '100%', maxWidth: '100%' }} src={`/img/badges/lvl-${level}.png`} alt="" />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#FFF',
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {levelsMapping.get(level)}
      </span>
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#FFF',
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {!isCompleted && <Lock size={22} />}
      </span>
    </div>
  );
};

export default Badge;

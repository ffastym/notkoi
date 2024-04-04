import { Overlay } from '../components/Overlay';
import { ComingSoon } from '../components/ComingSoon';
import { DialogProps } from '../types';

export function Leaderboard({ isVisible, hide }: DialogProps) {
  return (
    <Overlay
      visible={isVisible}
      title={'Leaderboard'}
      accept={{
        text: 'OK',
        action: hide,
      }}
    >
      <ComingSoon>Your score in the fisherman rating</ComingSoon>
    </Overlay>
  );
}

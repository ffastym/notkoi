import { Overlay } from '../components/Overlay';
import { ComingSoon } from '../components/ComingSoon';
import { DialogProps } from '../types';

export function Profile({ isVisible, hide }: DialogProps) {
  return (
    <Overlay
      visible={isVisible}
      title={'Profile'}
      accept={{
        text: 'OK',
        action: hide,
      }}
    >
      <ComingSoon>Your profile, friends, rewards, etc.</ComingSoon>
    </Overlay>
  );
}

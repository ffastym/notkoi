import { Overlay } from '../components/Overlay';
import { ComingSoon } from '../components/ComingSoon';
import { DialogProps } from '../types';

export function FishGone({ isVisible, hide }: DialogProps) {
  return (
    <Overlay
      visible={isVisible}
      title={'Fish gone...'}
      accept={{
        text: 'OK',
        action: hide,
      }}
    >
      <ComingSoon>You is missing the fish</ComingSoon>
    </Overlay>
  );
}

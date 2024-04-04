import { Overlay } from '../components/Overlay';
import { ComingSoon } from '../components/ComingSoon';
import { DialogProps } from '../types';

export function BaitsBox({ isVisible, hide }: DialogProps) {
  return (
    <Overlay
      visible={isVisible}
      title={'Baits box'}
      accept={{
        text: 'OK',
        action: hide,
      }}
    >
      <ComingSoon>Buy a fishing baits to increase a chance to catch a Koi fish!</ComingSoon>
    </Overlay>
  );
}

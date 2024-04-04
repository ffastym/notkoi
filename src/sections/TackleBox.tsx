import { Overlay } from '../components/Overlay';
import { ComingSoon } from '../components/ComingSoon';
import { DialogProps } from '../types';

export function TackleBox({ isVisible, hide }: DialogProps) {
  return (
    <Overlay
      visible={isVisible}
      title={'Tackle box'}
      accept={{
        text: 'OK',
        action: hide,
      }}
    >
      <ComingSoon>Buy a fishing equipment to catch more and faster</ComingSoon>
    </Overlay>
  );
}

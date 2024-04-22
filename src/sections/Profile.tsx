import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { ComingSoon } from '../components/ComingSoon';
import { useUserQuery } from '../pages/Home/Home.operations.generated';

export function Profile({ isVisible, hide }: DialogProps) {
  const { data } = useUserQuery({ fetchPolicy: 'cache-and-network' });

  if (!data) return null;

  return (
    <Overlay
      visible={isVisible}
      title={'Profile'}
      onClose={hide}
      accept={{
        text: 'OK',
        action: hide,
      }}
    >
      <ComingSoon>Your profile information, stats and achievements</ComingSoon>
    </Overlay>
  );
}

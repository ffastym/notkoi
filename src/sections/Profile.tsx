import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { useReferFriendMutation, useUserQuery } from '../App.operations.generated';
import { Button, FlexBoxCol } from '../components/styled/styled';

export function Profile({ isVisible, hide }: DialogProps) {
  const { data } = useUserQuery({ fetchPolicy: 'cache-and-network' });
  const [referRequest] = useReferFriendMutation();

  const referFriend = async () => {
    await referRequest({ fetchPolicy: 'no-cache' });
  };

  if (!data) {
    return null;
  }

  return (
    <Overlay visible={isVisible} title={'Profile'} onClose={hide}>
      <FlexBoxCol>
        <span>Invite a friends and earn coins for each active referral</span>
        <Button onClick={referFriend}>Refer a Friend</Button>
      </FlexBoxCol>
    </Overlay>
  );
}

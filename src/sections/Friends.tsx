import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { Button, FlexBoxCol } from '../components/styled/styled';
import { useFriendsCountQuery, useReferFriendMutation } from '../App.operations.generated';

export function Friends({ isVisible, hide }: DialogProps) {
  const { data: friendsCountData } = useFriendsCountQuery({ fetchPolicy: 'cache-and-network' });
  const [referRequest] = useReferFriendMutation();

  const referFriend = async () => {
    await referRequest({ fetchPolicy: 'no-cache' });
  };

  return (
    <Overlay visible={isVisible} title={'Friends'} onClose={hide}>
      <FlexBoxCol>
        <span>Invite a friends and earn 500 coins immediately and 20% from the cost of each their caught fish!</span>
        <span>Total friends: {friendsCountData?.friendsCount || 0}</span>
        <Button onClick={referFriend}>Refer a Friend</Button>
      </FlexBoxCol>
    </Overlay>
  );
}

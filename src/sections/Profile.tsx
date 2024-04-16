import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { useFriendsCountQuery, useReferFriendMutation, useUserQuery } from '../App.operations.generated';
import { Button, FlexBoxCol } from '../components/styled/styled';

export function Profile({ isVisible, hide }: DialogProps) {
  const { data } = useUserQuery({ fetchPolicy: 'cache-and-network' });
  const { data: friendsCountData } = useFriendsCountQuery({ fetchPolicy: 'cache-and-network' });
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
        <span>Invite a friends and earn 500 coins immediately and 20% from the cost of each their caught fish!</span>
        <span>Total friends: {friendsCountData?.friendsCount || 0}</span>
        <Button onClick={referFriend}>Refer a Friend</Button>
      </FlexBoxCol>
    </Overlay>
  );
}

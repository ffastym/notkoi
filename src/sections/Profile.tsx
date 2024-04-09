import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { useReferFriendMutation, useUserQuery } from '../App.operations.generated';
import { Button, FlexBoxCol } from '../components/styled/styled';

export function Profile({ isVisible, hide }: DialogProps) {
  const { data } = useUserQuery({ fetchPolicy: 'cache-and-network' });
  const [referRequest] = useReferFriendMutation();

  const referFriend = async () => {
    await referRequest({ fetchPolicy: 'no-cache' });
    window.Telegram.WebApp.openTelegramLink('https://t.me/notkoi_bot');
  };

  if (!data) {
    return null;
  }

  const referralLink = `https://t.me/notkoi_bot/?start=${data?.user.referralCode}`;

  return (
    <Overlay visible={isVisible} title={'Profile'} onClose={hide}>
      <FlexBoxCol>
        <span>Referral link: {referralLink}</span>
        <Button onClick={referFriend}>Refer a Friend</Button>
      </FlexBoxCol>
    </Overlay>
  );
}

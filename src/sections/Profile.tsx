import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { useReferFriendMutation, useUserQuery } from '../App.operations.generated';
import { Button, FlexBoxCol } from '../components/styled/styled';
import { useMemo } from 'react';

export function Profile({ isVisible, hide }: DialogProps) {
  const { data } = useUserQuery({ fetchPolicy: 'cache-and-network' });
  const [referRequest] = useReferFriendMutation();

  const referFriend = async () => {
    await referRequest({ fetchPolicy: 'no-cache' });
  };

  const referralLink = useMemo(
    () => `https://t.me/notkoi_bot/?start=${data?.user.referralCode}`,
    [data?.user.referralCode],
  );

  // const btnClicked = useCallback(() => {
  //   referFriend();
  //   tg.sendData(JSON.stringify({ referralLink }));
  // }, [referralLink, tg]);

  // useEffect(() => {
  //   tg.MainButton.setParams({ text: 'refer friend,', is_active: true, is_visible: true });
  //   tg.MainButton.isVisible = true;
  //   tg.MainButton.show();
  //   tg.onEvent('mainButtonClicked', btnClicked);
  //
  //   return () => {
  //     tg.offEvent('mainButtonClicked', btnClicked);
  //   };
  // }, [btnClicked, tg]);

  if (!data) {
    return null;
  }

  return (
    <Overlay visible={isVisible} title={'Profile'} onClose={hide}>
      <FlexBoxCol>
        <span>Referral link: {referralLink}</span>
        <Button onClick={referFriend}>Refer a Friend</Button>
      </FlexBoxCol>
    </Overlay>
  );
}

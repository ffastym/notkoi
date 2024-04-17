import { FlexBoxCol, FlexBoxRow, PageWrapper } from '../../components/styled/styled';
import { useReferFriendMutation } from '../../App.operations.generated';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Coins from '../../components/Coins';
import { CoinType } from '../../types/CoinType';
import { useFriendsQuery } from './Friends.operations.generated';

const Friends = () => {
  const { data: friendsData } = useFriendsQuery({ fetchPolicy: 'cache-and-network' });
  const [referRequest] = useReferFriendMutation();
  const { tg } = useTelegram();
  const navigate = useNavigate();

  const referFriend = useCallback(async () => {
    await referRequest({ fetchPolicy: 'no-cache' });
  }, [referRequest]);

  useEffect(() => {
    tg.BackButton.onClick(() => navigate(-1));
    tg.BackButton.show();

    tg.MainButton.text = 'Get the referral link';
    tg.MainButton.onClick(referFriend);
    tg.MainButton.show();

    return () => {
      tg.MainButton.hide();
      tg.BackButton.hide();
    };
  }, [navigate, referFriend, tg.BackButton, tg.MainButton]);

  return (
    <PageWrapper>
      <FlexBoxCol style={{ alignItems: 'center' }}>
        <img width={150} height={150} src="/img/support.png" alt="friends" />
        <h1>{friendsData?.friends.length || 0} Friends</h1>
        <span style={{ fontWeight: 500, textAlign: 'center' }}>
          Invite a friends to get{' '}
          <Coins style={{ display: 'inline-flex', marginBottom: -60 }} size={12} coins={500} type={CoinType.COIN} />
          immediately for both you and your referral. Also You will earn 20% from the cost of each their caught fish!
        </span>
      </FlexBoxCol>
      <h2 style={{ marginTop: 32 }}>My friends</h2>
      <FlexBoxCol style={{ background: 'rgba(0,0,0,.2)', padding: 16, borderRadius: 25, flex: 1 }}>
        {friendsData?.friends.length ? (
          friendsData.friends.map((friend, index) => (
            <FlexBoxRow key={friend.id} style={{ alignItems: 'center' }}>
              <span
                style={{
                  background: '#e4e4e4',
                  width: 25,
                  height: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                }}
              >
                {index + 1}
              </span>
              <span style={{ fontSize: 16, fontWeight: 500 }}>{friend.fullName}</span>
              <Coins coins={friend.coins} type={CoinType.COIN} style={{ marginLeft: 'auto' }} />
            </FlexBoxRow>
          ))
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontWeight: 500 }}>There are no friends yet =(</span>
          </div>
        )}
      </FlexBoxCol>
    </PageWrapper>
  );
};

export default Friends;

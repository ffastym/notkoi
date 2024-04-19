import { FlexBoxCol, PageWrapper } from '../../components/styled/styled';
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

  const handleGoBack = useCallback(() => navigate(-1), [navigate]);

  useEffect(() => {
    tg.MainButton.text = 'Get the referral link';
    tg.onEvent('backButtonClicked', handleGoBack);
    tg.onEvent('mainButtonClicked', referFriend);

    if (!tg.BackButton.isVisible) {
      tg.BackButton.show();
    }

    if (!tg.MainButton.isVisible) {
      tg.MainButton.show();
    }

    return () => {
      tg.offEvent('backButtonClicked', handleGoBack);
      tg.offEvent('mainButtonClicked', referFriend);

      if (tg.MainButton.isVisible) {
        tg.MainButton.hide();
      }

      if (tg.BackButton.isVisible) {
        tg.BackButton.hide();
      }
    };
  }, [handleGoBack, navigate, referFriend, tg, tg.BackButton, tg.MainButton]);

  return (
    <PageWrapper>
      <FlexBoxCol style={{ alignItems: 'center' }}>
        <img width={150} height={150} src="/img/support.png" alt="friends" />
        <h1>{friendsData?.friends.length || 0} Friends</h1>
        <span style={{ fontWeight: 500, textAlign: 'center' }}>
          Invite a friends to get{' '}
          <Coins style={{ display: 'inline-flex', marginRight: 6 }} size={12} coins={500} type={CoinType.COIN} />
          immediately for both you and your referral. Also You will earn 20% from the cost of each their caught fish!
        </span>
      </FlexBoxCol>
      <h2 style={{ marginTop: 32 }}>My friends</h2>

      <div style={{ background: 'rgba(0,0,0,.1)', padding: 16, borderRadius: 25, flex: 1 }}>
        <table style={{ width: '100%' }}>
          {friendsData?.friends.length ? (
            <tbody>
              {friendsData.friends.map((friend, index) => (
                <tr key={friend.id}>
                  <td>
                    <span
                      style={{
                        background:
                          index === 0 ? '#ffe13f' : index === 1 ? '#b4b4b4' : index === 2 ? '#ca7e29' : undefined,
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
                  </td>
                  <td>
                    <span style={{ fontSize: 16, fontWeight: 500 }}>{friend.fullName}</span>
                  </td>
                  <td>
                    <Coins coins={friend.coins} type={CoinType.COIN} size={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 500 }}>There are no friends yet =(</span>
            </div>
          )}
        </table>
      </div>
    </PageWrapper>
  );
};

export default Friends;

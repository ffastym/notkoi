import { FlexBoxCol, PageWrapper } from '../../components/styled/styled';
import Coins from '../../components/Coins';
import { CoinType } from '../../types/CoinType';
import { useLeaderboardQuery } from './Leaderboard.operations.generated';
import { useBackButton } from '../../hooks/useBackButton';

const Leaderboard = () => {
  const { data: leaderboardData } = useLeaderboardQuery({ fetchPolicy: 'cache-and-network' });
  useBackButton();

  return (
    <PageWrapper>
      <FlexBoxCol style={{ alignItems: 'center' }}>
        <img width={150} height={150} src="/img/leaderboard.png" alt="friends" />
        <h1>Leaderboard</h1>
      </FlexBoxCol>
      <div style={{ background: 'rgba(0,0,0,.1)', padding: 16, borderRadius: 25, flex: 1 }}>
        <table style={{ width: '100%' }}>
          {leaderboardData?.leaderboard.length ? (
            <tbody>
              {leaderboardData.leaderboard.map((user, index) => (
                <tr key={user.id}>
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
                    <span style={{ fontSize: 16, fontWeight: 500 }}>{user.fullName}</span>
                  </td>
                  <td>
                    <Coins coins={+user.coins} type={CoinType.COIN} size={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 500 }}>There are no fishermen yet =(</span>
            </div>
          )}
        </table>
      </div>
    </PageWrapper>
  );
};

export default Leaderboard;

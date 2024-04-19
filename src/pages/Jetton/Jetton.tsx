import { useJettonContract } from '../../hooks/useJettonContract';
import { useTonConnect } from '../../hooks/useTonConnect';
import { FlexBoxCol, PageWrapper } from '../../components/styled/styled';
import { Header } from '../../sections/Header';
import { LoginDataFragment } from '../../App.operations.generated';
import { useEffect, useMemo } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';
import Coins from '../../components/Coins';
import { CoinType } from '../../types/CoinType';
import { formatPrice } from '../../common/utils/priceUtils';

const MIN_COINS_AMOUNT_FOR_MINT = 10000000;
const NOTKOI_COINS_COST = 10000;

const Jetton = ({ user }: { user: LoginDataFragment }) => {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { connected } = useTonConnect();
  const { mint } = useJettonContract();

  const notkoiAmount = useMemo(() => {
    const notkoiValue = user.coins / NOTKOI_COINS_COST;

    return user.coins > NOTKOI_COINS_COST
      ? formatPrice(notkoiValue > MIN_COINS_AMOUNT_FOR_MINT ? Math.ceil(notkoiValue) : Number(notkoiValue.toFixed(1)))
      : notkoiValue <= 0
        ? 0
        : notkoiValue.toFixed(4);
  }, [user.coins]);

  useEffect(() => {
    tg.BackButton.onClick(() => navigate(-1));
    tg.BackButton.show();

    tg.MainButton.text = 'Convert points to tokens';
    tg.MainButton.onClick(() => mint(BigInt(notkoiAmount)));
    tg.MainButton.show();

    if (connected && user.coins >= MIN_COINS_AMOUNT_FOR_MINT) {
      tg.MainButton.enable();
    } else {
      tg.MainButton.disable();
    }

    return () => {
      tg.MainButton.hide();
      tg.BackButton.hide();
    };
  }, [navigate, mint, tg.BackButton, tg.MainButton, connected, user.coins, notkoiAmount]);

  return (
    <PageWrapper style={{ paddingTop: 60 }}>
      <Header coins={user.coins} />
      <h3 style={{ textAlign: 'center', marginBottom: 32, fontWeight: 600 }}>Convert your game balance to crypto</h3>
      <FlexBoxCol style={{ alignItems: 'center' }}>
        <img width={100} height={100} src="/img/coin.png" alt="coin" />
        <span style={{ fontSize: 32, fontWeight: 'bold' }}>{formatPrice(user.coins)}</span>
        <h2 style={{ fontSize: 32, fontWeight: 'bold', margin: '16px 0' }}>≈</h2>
        <img width={100} height={100} src="/img/notkoi-coin.png" alt="NOTKOI" />
        <span style={{ fontSize: 32, fontWeight: 'bold' }}>{notkoiAmount}</span>
        <FlexBoxCol style={{ marginTop: 24, alignItems: 'center' }}>
          {connected ? (
            <>
              <span style={{ color: 'var(--tg-theme-hint-color)' }}>The minimum value for conversion is </span>
              <Coins
                style={{ display: 'inline-flex' }}
                size={12}
                coins={MIN_COINS_AMOUNT_FOR_MINT}
                type={CoinType.COIN}
              />
            </>
          ) : (
            <span>Connect your wallet to complete the conversion</span>
          )}
        </FlexBoxCol>
      </FlexBoxCol>
    </PageWrapper>
  );
};

export default Jetton;

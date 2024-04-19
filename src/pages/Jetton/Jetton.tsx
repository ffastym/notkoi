import { useJettonContract } from '../../hooks/useJettonContract';
import { useTonConnect } from '../../hooks/useTonConnect';
import { Button, FlexBoxCol, PageWrapper } from '../../components/styled/styled';
import { Header } from '../../sections/Header';
import { LoginDataFragment, LoginDataFragmentDoc } from '../../App.operations.generated';
import { useCallback, useEffect, useMemo } from 'react';
import { useTelegram } from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';
import Coins from '../../components/Coins';
import { CoinType } from '../../types/CoinType';
import { formatPrice } from '../../common/utils/priceUtils';
import { AppRoute, getRouteWithSlash } from '../../types/AppRoute';
import { useWithdrawMutation } from './Jetton.operations.generated';
import { client } from '../../config/apollo';

const MIN_COINS_AMOUNT_FOR_MINT = 10000000;
const NOTKOI_COINS_COST = 10000;

const Jetton = ({ user, balance }: { user: LoginDataFragment; balance: string }) => {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const { connected } = useTonConnect();
  const { mint } = useJettonContract();
  const [callWithdraw] = useWithdrawMutation({ fetchPolicy: 'no-cache' });

  const handleGoHome = useCallback(() => navigate(getRouteWithSlash(AppRoute.HOME)), [navigate]);

  const updateCoins = useCallback(
    (coins: number) => {
      client.cache.updateFragment(
        {
          fragment: LoginDataFragmentDoc,
          id: `User:${user.id}`,
        },
        (prevLoginData: any) => {
          return { ...prevLoginData, coins };
        },
      );
    },
    [user.id],
  );

  const withdrawCoins = useCallback(async () => {
    await callWithdraw({ variables: { coins: user.coins } }).then(({ data }) => {
      if (data) {
        updateCoins(data.withdraw);
      }
    });
  }, [callWithdraw, updateCoins, user.coins]);

  const notkoiAmount = useMemo(() => {
    const notkoiValue = user.coins / NOTKOI_COINS_COST;

    return user.coins > NOTKOI_COINS_COST
      ? formatPrice(notkoiValue > MIN_COINS_AMOUNT_FOR_MINT ? Math.ceil(notkoiValue) : Number(notkoiValue.toFixed(1)))
      : notkoiValue <= 0
        ? '0'
        : notkoiValue.toFixed(4);
  }, [user.coins]);

  const handleMint = useCallback(async () => {
    if (connected) {
      if (user.coins < MIN_COINS_AMOUNT_FOR_MINT) {
        tg.showAlert(`The minimum value for conversion is ${formatPrice(MIN_COINS_AMOUNT_FOR_MINT)}`);
        return;
      }

      try {
        // TODO fix conversion (digits after comma)
        await mint(BigInt(Math.round(user.coins / NOTKOI_COINS_COST)));
        await withdrawCoins();
      } catch (e) {
        // do nothing
      }
    } else {
      tg.showAlert('Connect a wallet to mint tokens');
    }
  }, [connected, mint, tg, user.coins, withdrawCoins]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', handleMint);
    tg.MainButton.text = 'Mint tokens';
    tg.MainButton.isVisible = true;

    return () => {
      tg.offEvent('mainButtonClicked', handleMint);
      tg.MainButton.isVisible = false;
    };
  }, [handleMint, tg]);

  useEffect(() => {
    tg.onEvent('backButtonClicked', handleGoHome);

    if (!tg.BackButton.isVisible) {
      tg.BackButton.show();
    }

    return () => {
      tg.offEvent('backButtonClicked', handleGoHome);

      if (tg.BackButton.isVisible) {
        tg.BackButton.hide();
      }
    };
  }, [handleGoHome, tg]);

  return (
    <PageWrapper style={{ paddingTop: 60 }}>
      <Header coins={user.coins} balance={balance} />
      <h1 style={{ textAlign: 'center', marginBottom: 32, fontWeight: 600 }}>Convert your game balance to crypto</h1>
      <FlexBoxCol style={{ alignItems: 'center' }}>
        <img width={100} height={100} src="/img/coin.png" alt="coin" />
        <span style={{ fontSize: 32, fontWeight: 'bold' }}>{formatPrice(user.coins)}</span>
        <h2 style={{ fontSize: 32, fontWeight: 'bold', margin: '16px 0' }}>≈</h2>
        <img width={100} height={100} src="/img/notkoi-coin.png" alt="NOTKOI" />
        <span style={{ fontSize: 32, fontWeight: 'bold' }}>{notkoiAmount}</span>
        <FlexBoxCol style={{ marginTop: 24, alignItems: 'center' }}>
          <span style={{ color: 'var(--tg-theme-hint-color)' }}>The minimum value for conversion is </span>
          <Coins style={{ display: 'inline-flex' }} size={12} coins={MIN_COINS_AMOUNT_FOR_MINT} type={CoinType.COIN} />
        </FlexBoxCol>
      </FlexBoxCol>
      {!tg.isVersionAtLeast('7') && (
        <Button style={{ marginTop: 16 }} onClick={handleMint} disabled={user.coins < MIN_COINS_AMOUNT_FOR_MINT}>
          Mint
        </Button>
      )}
    </PageWrapper>
  );
};

export default Jetton;

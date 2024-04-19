import Styled, { FlexBoxRow } from '../components/styled/styled';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '../hooks/useTonConnect';
import Coins from '../components/Coins';
import { CoinType } from '../types/CoinType';
import { TON_CURRENCY_ENABLED } from '../config';
import { useNavigate } from 'react-router-dom';
import { AppRoute, getRouteWithSlash } from '../types/AppRoute';
import { CSSProperties, useEffect } from 'react';
import { useJettonContract } from '../hooks/useJettonContract';

export function Header({ coins, style }: { coins: number; style?: CSSProperties }) {
  const { network } = useTonConnect();
  const navigate = useNavigate();
  const { balance } = useJettonContract();

  const openJetton = () => {
    navigate(getRouteWithSlash(AppRoute.JETTON));
  };

  useEffect(() => {
    console.log(network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A', ' -->>> network');
  }, [network]);

  return (
    <Styled.Header>
      <FlexBoxRow onClick={openJetton}>
        <Coins coins={coins} type={CoinType.COIN} style={style} />
        {TON_CURRENCY_ENABLED && (
          <Coins
            style={{ marginRight: 8, ...style }}
            coins={balance ? Math.round(Number(balance)) : 0}
            type={CoinType.NOTKOI}
          />
        )}
      </FlexBoxRow>
      {TON_CURRENCY_ENABLED && <TonConnectButton />}
    </Styled.Header>
  );
}

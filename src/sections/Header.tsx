import Styled, { FlexBoxRow } from '../components/styled/styled';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '../hooks/useTonConnect';
import Coins from '../components/Coins';
import { CoinType } from '../types/CoinType';

export function Header({ coins }: { coins: number }) {
  const { network } = useTonConnect();

  return (
    <Styled.Header>
      {/*<Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>*/}
      <FlexBoxRow>
        <Coins coins={coins} type={CoinType.COIN} />
        <Coins coins={0} type={CoinType.TON} />
      </FlexBoxRow>
      <TonConnectButton />
    </Styled.Header>
  );
}

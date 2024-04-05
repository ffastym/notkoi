import Styled, { FlexBoxRow } from '../components/styled/styled';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '../hooks/useTonConnect';

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
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
          <img style={{ marginRight: 8, height: 25, width: 25 }} src="/img/coin.png" alt="" />
          <span style={{ color: '#fff', fontWeight: 500 }}>{coins}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ marginRight: 8, height: 25, width: 25 }} src="/img/currency.png" alt="" />
          <span style={{ color: '#fff', fontWeight: 500 }}>25</span>
        </div>
      </FlexBoxRow>
      <TonConnectButton />
    </Styled.Header>
  );
}

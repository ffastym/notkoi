import Styled, { FlexBoxRow } from '../components/styled/styled';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '../hooks/useTonConnect';
import { useNewChatMessageSubscription } from '../App.operations.generated';

export function Header() {
  const { network } = useTonConnect();

  const { data: newChatMessageSubscriptionData } = useNewChatMessageSubscription({
    shouldResubscribe: true,
    fetchPolicy: 'no-cache',
  });

  console.log(newChatMessageSubscriptionData?.newChatMessage, ' -->>> newChatMessageSubscriptionData');

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
          <img style={{ marginRight: 8, height: 25, width: 25 }} src="/notkoi/img/coin.png" alt="" />
          <span style={{ color: '#fff', fontWeight: 500 }}>1 000</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img style={{ marginRight: 8, height: 25, width: 25 }} src="/notkoi/img/currency.png" alt="" />
          <span style={{ color: '#fff', fontWeight: 500 }}>25</span>
        </div>
      </FlexBoxRow>
      <TonConnectButton />
    </Styled.Header>
  );
}

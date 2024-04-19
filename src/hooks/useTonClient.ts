import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from '@ton/ton';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';

export function useTonClient() {
  const { network } = useTonConnect();

  return {
    client: useAsyncInitialize(async () => {
      if (!network) return;

      return new TonClient({
        endpoint: await getHttpEndpoint({
          // TODO move to config
          network: 'testnet',
          //network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
        }),
      });
    }, [network]),
  };
}

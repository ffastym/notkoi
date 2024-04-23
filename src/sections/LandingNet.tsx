import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { BitingWithFishFragment } from '../App.operations.generated';
import { useCallback } from 'react';
import { FishType } from '../generated/types';

export function LandingNet({
  isVisible,
  biting,
  sell,
  mint,
  release,
}: DialogProps & {
  biting: BitingWithFishFragment;
  // eslint-disable-next-line no-unused-vars
  sell: (bitingId: string) => void;
  // eslint-disable-next-line no-unused-vars
  mint: (bitingId: string) => void;
  // eslint-disable-next-line no-unused-vars
  release: (bitingId: string) => void;
}) {
  const { fish } = biting;
  const isNft = fish.type === FishType.Nft;

  const acceptAction = useCallback(() => {
    return isNft ? mint(biting.id) : sell(biting.id);
  }, [isNft, mint, biting.id, sell]);

  return (
    <Overlay
      visible={isVisible}
      title={'You catch the fish!'}
      accept={{
        text: isNft ? (
          <span>Mint NFT</span>
        ) : (
          <>
            <span style={{ color: '#fff' }}>Sell</span>
            <img style={{ margin: '0 5px 0 10px', height: 16, width: 16 }} src="/img/coin.png" alt="" />
            <span style={{ color: '#fff' }}>{fish.price}</span>
          </>
        ),
        action: acceptAction,
      }}
      reject={{ text: 'Release', action: () => release(biting.id) }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={`/img/fish/${fish.picture}`} alt="" />
        <span style={{ fontSize: 18, fontWeight: 500, marginTop: isNft ? 16 : undefined }}>{fish.name}</span>
      </div>
    </Overlay>
  );
}

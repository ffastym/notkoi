import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { BitingWithFishFragment } from '../App.operations.generated';

export function LandingNet({
  isVisible,
  biting,
  sell,
  release,
}: DialogProps & {
  biting: BitingWithFishFragment;
  // eslint-disable-next-line no-unused-vars
  sell: (bitingId: string) => void;
  // eslint-disable-next-line no-unused-vars
  release: (bitingId: string) => void;
}) {
  return (
    <Overlay
      visible={isVisible}
      title={'You catch the fish!'}
      accept={{
        text: (
          <>
            <span style={{ color: '#fff' }}>Sell</span>
            <img style={{ margin: '0 5px 0 10px', height: 16, width: 16 }} src="/img/coin.png" alt="" />
            <span style={{ color: '#fff' }}>{biting.fish.price}</span>
          </>
        ),
        action: () => sell(biting.id),
      }}
      reject={{ text: 'Release', action: () => release(biting.id) }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={`/img/fish/${biting.fish.picture}`} alt="" />
        <span style={{ fontSize: 18, fontWeight: 500 }}>{biting.fish.name}</span>
      </div>
    </Overlay>
  );
}

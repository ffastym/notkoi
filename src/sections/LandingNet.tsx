import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { CatchedFishFragment } from '../App.operations.generated';

export function LandingNet({
  isVisible,
  hide,
  fish,
  sell,
  // eslint-disable-next-line no-unused-vars
}: DialogProps & { fish: CatchedFishFragment; sell: (fishId: number) => void }) {
  return (
    <Overlay
      visible={isVisible}
      title={'You catch the fish!'}
      accept={{
        text: (
          <>
            <span style={{ color: '#fff' }}>Sell</span>
            <img style={{ margin: '0 5px 0 10px', height: 16, width: 16 }} src="/img/coin.png" alt="" />
            <span style={{ color: '#fff' }}>{fish.price}</span>
          </>
        ),
        action: () => sell(fish.id),
      }}
      reject={{ text: 'Release', action: hide }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img style={{ maxWidth: '100%', maxHeight: '100%' }} src={`/img/fish/${fish.picture}`} alt="" />
        <span style={{ fontSize: 18, fontWeight: 500 }}>{fish.name}</span>
      </div>
    </Overlay>
  );
}

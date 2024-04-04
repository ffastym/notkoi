import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';

export function LandingNet({ isVisible, hide }: DialogProps) {
  return (
    <Overlay
      visible={isVisible}
      title={'You catch the fish!'}
      accept={{
        text: (
          <>
            <span style={{ color: '#fff' }}>Sell</span>
            <img style={{ margin: '0 5px 0 10px', height: 16, width: 16 }} src="/notkoi/img/coin.png" alt="" />
            <span style={{ color: '#fff' }}>5</span>
          </>
        ),
        action: hide,
      }}
      reject={{ text: 'Release', action: hide }}
    >
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img style={{ marginTop: -32 }} src="/notkoi/img/token.png" alt="" />
        <span style={{ fontSize: 18, fontWeight: 500, marginTop: -28 }}>Koi fish</span>
      </div>
    </Overlay>
  );
}

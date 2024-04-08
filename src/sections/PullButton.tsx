type PullButtonProps = { onPull: () => void; onPush: () => void };

export function PullButton({ onPull, onPush }: PullButtonProps) {
  return (
    <button
      onTouchStart={onPull}
      onTouchEnd={onPush}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        zIndex: 1,
        position: 'absolute',
        right: 16,
        bottom: 100,
        background: 'rgba(255,255,255,.3)',
        border: '2px solid #fff',
        height: 75,
        width: 75,
      }}
    >
      <img style={{ height: 45, width: 45 }} src="/img/reels-2-white.png" alt="" />
    </button>
  );
}

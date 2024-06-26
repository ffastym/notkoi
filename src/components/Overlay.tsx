import { Button, FlexBoxCol, FlexBoxRow } from './styled/styled';

export function Overlay({ children, title, accept, reject, visible, onClose }: any) {
  if (!visible) {
    return null;
  }

  return (
    <div
      style={{ zIndex: 999, position: 'fixed', background: 'rgba(0,0,0,0.8)', left: 0, top: 0, right: 0, bottom: 0 }}
    >
      <FlexBoxCol
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          maxHeight: '500px',
          width: '80%',
          background: 'var(--tg-theme-secondary-bg-color)',
          borderRadius: '25px',
        }}
      >
        <div style={{ padding: '16px' }}>
          <span
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: 'var(--tg-theme-text-color)',
              textAlign: 'center',
              display: 'block',
            }}
          >
            {title}
            {onClose && <button className="close" onClick={onClose}></button>}
          </span>
        </div>
        <div style={{ flex: 1, padding: '0 16px' }}>{children}</div>
        {accept || reject ? (
          <FlexBoxRow style={{ padding: '16px' }}>
            {accept && <Button onClick={accept.action}>{accept.text}</Button>}
            {reject && <Button onClick={reject.action}>{reject.text}</Button>}
          </FlexBoxRow>
        ) : (
          <div style={{ height: 16 }} />
        )}
      </FlexBoxCol>
    </div>
  );
}

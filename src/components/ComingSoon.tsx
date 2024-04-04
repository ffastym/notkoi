export function ComingSoon({ children }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <img style={{ height: 100, width: 100 }} src="/notkoi/img/coming-soon.png" alt="" />
      <span style={{ marginTop: 16, fontWeight: 500, textAlign: 'center' }}>{children}</span>
    </div>
  );
}

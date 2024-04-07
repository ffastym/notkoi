import { CoinType } from '../types/CoinType';

type CoinsProps = {
  coins: number;
  type: CoinType;
};

const Coins = ({ coins, type }: CoinsProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
      <img
        style={{ marginRight: 8, height: 25, width: 25 }}
        src={type === CoinType.COIN ? '/img/coin.png' : '/img/currency.png'}
        alt=""
      />
      <span style={{ color: '#fff', fontWeight: 500 }}>{coins}</span>
    </div>
  );
};

export default Coins;

import { CoinType } from '../types/CoinType';
import { CSSProperties } from 'react';

type CoinsProps = {
  coins: number;
  type: CoinType;
  style?: CSSProperties;
  size?: number;
};

const Coins = ({ coins, type, style, size }: CoinsProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', ...style }}>
      <img
        style={{ marginRight: 8, height: size || 25, width: size || 25 }}
        src={type === CoinType.COIN ? '/img/coin.png' : '/img/currency.png'}
        alt="coin"
      />
      <span style={{ fontWeight: 500 }}>{coins}</span>
    </div>
  );
};

export default Coins;

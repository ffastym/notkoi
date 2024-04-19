import { CoinType } from '../types/CoinType';
import { CSSProperties } from 'react';
import { formatPrice } from '../common/utils/priceUtils';

type CoinsProps = {
  coins: number;
  type: CoinType;
  style?: CSSProperties;
  size?: number;
  onClick?: () => void;
};

const Coins = ({ coins, type, style, size, ...rest }: CoinsProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', ...style }} {...rest}>
      <img
        style={{ marginRight: 8, height: size || 25, width: size || 25 }}
        src={
          type === CoinType.COIN
            ? '/img/coin.png'
            : type === CoinType.NOTKOI
              ? '/img/notkoi-coin.png'
              : '/img/currency.png'
        }
        alt="coin"
      />
      <span style={{ fontWeight: 500, textAlign: 'center', width: '100%', display: 'block' }}>
        {formatPrice(coins)}
      </span>
    </div>
  );
};

export default Coins;

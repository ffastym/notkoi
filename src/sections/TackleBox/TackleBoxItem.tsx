import { Button, FlexBoxCol, FlexBoxRow } from '../../components/styled/styled';
import Coins from '../../components/Coins';
import { CoinType } from '../../types/CoinType';
import { MainBoxFragment, MainBoxFragmentDoc, useUpgradeBoxMutation } from './TackleBox.operations.generated';
import { BoxItemType } from '../../generated/types';
import { client } from '../../config/apollo';
import { TON_CURRENCY_ENABLED } from '../../config';
import Lock from '../../components/Lock';

type TackleBoxItemProps = {
  name: string;
  coinsCost: number;
  tonCost: number;
  level: number;
  locked: boolean;
  picture: string;
  boxId: string;
  boxItemType: BoxItemType;
};

const TackleBoxItem = ({
  locked,
  tonCost,
  coinsCost,
  level,
  picture,
  name,
  boxId,
  boxItemType,
}: TackleBoxItemProps) => {
  const [upgrade] = useUpgradeBoxMutation({ fetchPolicy: 'no-cache' });

  const updateBox = (box: MainBoxFragment) => {
    client.cache.updateFragment(
      {
        fragment: MainBoxFragmentDoc,
        id: `Box:${box.id}`,
      },
      () => box,
    );
  };

  const upgradeBox = async () => {
    if (locked) {
      return;
    }

    const upgradedBox = await upgrade({ variables: { boxId, boxItemType } });

    if (upgradedBox.data) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      updateBox(upgradedBox.data?.upgradeBox);
    }
  };

  return (
    <FlexBoxCol>
      <FlexBoxRow>
        <img style={{ height: 40, width: 40, marginRight: 8 }} src={picture} alt="" />
        <FlexBoxCol>
          <span style={{ fontWeight: 'bold' }}>{name}</span>
          <span style={{ color: 'var(--tg-theme-hint-color)' }}>Level {level}</span>
        </FlexBoxCol>
      </FlexBoxRow>
      <FlexBoxRow>
        <Button
          disabled={locked}
          onClick={upgradeBox}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <FlexBoxRow style={{ opacity: locked ? '0.6' : 1 }}>
            {locked && <Lock />}
            <Coins coins={coinsCost} type={CoinType.COIN} />
          </FlexBoxRow>
        </Button>
        {TON_CURRENCY_ENABLED && (
          <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Coins coins={tonCost} type={CoinType.TON} />
          </Button>
        )}
      </FlexBoxRow>
    </FlexBoxCol>
  );
};

export default TackleBoxItem;

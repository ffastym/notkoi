import { Button, FlexBoxCol, FlexBoxRow } from '../../components/styled/styled';
import Coins from '../../components/Coins';
import { CoinType } from '../../types/CoinType';
import { MainBoxFragment, MainBoxFragmentDoc, useUpgradeBoxMutation } from './TackleBox.operations.generated';
import { BoxItemType } from '../../generated/types';
import { client } from '../../config/apollo';
import { TON_CURRENCY_ENABLED } from '../../config';

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
          <span style={{ color: 'grey' }}>Level {level}</span>
        </FlexBoxCol>
      </FlexBoxRow>
      <FlexBoxRow>
        <Button
          disabled={locked}
          onClick={upgradeBox}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <FlexBoxRow style={{ opacity: locked ? '0.6' : 1 }}>
            {locked && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Iconly/Bold/Lock">
                  <g id="Lock">
                    <path
                      id="Lock_2"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17.5227 7.39601V8.92935C19.2451 9.46696 20.5 11.0261 20.5 12.8884V17.8253C20.5 20.1308 18.5886 22 16.2322 22H7.7688C5.41136 22 3.5 20.1308 3.5 17.8253V12.8884C3.5 11.0261 4.75595 9.46696 6.47729 8.92935V7.39601C6.48745 4.41479 8.95667 2 11.9848 2C15.0535 2 17.5227 4.41479 17.5227 7.39601ZM12.0051 3.73904C14.0678 3.73904 15.7445 5.37871 15.7445 7.39601V8.7137H8.25553V7.37613C8.26569 5.36878 9.94232 3.73904 12.0051 3.73904ZM12.8891 16.4549C12.8891 16.9419 12.4928 17.3294 11.9949 17.3294C11.5072 17.3294 11.1109 16.9419 11.1109 16.4549V14.2488C11.1109 13.7718 11.5072 13.3843 11.9949 13.3843C12.4928 13.3843 12.8891 13.7718 12.8891 14.2488V16.4549Z"
                      fill="#200E32"
                    />
                  </g>
                </g>
              </svg>
            )}
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

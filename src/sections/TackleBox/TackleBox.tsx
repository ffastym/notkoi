import { Overlay } from '../../components/Overlay';
import { DialogProps } from '../../types';
import { FlexBoxCol } from '../../components/styled/styled';
import { LoginDataFragment } from '../../App.operations.generated';
import { useTackleBoxQuery } from './TackleBox.operations.generated';
import TackleBoxItem from './TackleBoxItem';
import { BoxItemType } from '../../generated/types';

type TackleBoxProps = DialogProps & Pick<LoginDataFragment, 'tackleBoxId'>;

function TackleBox({ isVisible, hide, tackleBoxId }: TackleBoxProps) {
  const { data, loading } = useTackleBoxQuery({ fetchPolicy: 'cache-and-network', variables: { boxId: tackleBoxId } });

  const renderContent = () => {
    if (!data) {
      return loading ? <span>Loading...</span> : null;
    }

    const {
      equipmentLevel,
      equipmentLevelUpdateTonCost,
      baitsLevel,
      baitsLevelUpdateCoinsCost,
      baitsLevelUpdateForCoinsPossible,
      baitsLevelUpdateTonCost,
      equipmentLevelUpdateForCoinsPossible,
      equipmentLevelUpdateCoinsCost,
      id,
    } = data.tackleBox;

    return (
      <FlexBoxCol>
        <TackleBoxItem
          name="Fishing equipment"
          coinsCost={equipmentLevelUpdateCoinsCost}
          tonCost={equipmentLevelUpdateTonCost}
          level={equipmentLevel}
          locked={!equipmentLevelUpdateForCoinsPossible}
          picture={'/img/equipment.png'}
          boxId={id}
          boxItemType={BoxItemType.Equipment}
        />
        <div
          style={{
            width: '100%',
            height: 1,
            opacity: 0.1,
            background: 'var(--tg-theme-text-color)',
            margin: '8px 0',
          }}
        />
        <TackleBoxItem
          name={'Fishing baits'}
          coinsCost={baitsLevelUpdateCoinsCost}
          tonCost={baitsLevelUpdateTonCost}
          level={baitsLevel}
          locked={!baitsLevelUpdateForCoinsPossible}
          picture={'/img/worm.png'}
          boxId={id}
          boxItemType={BoxItemType.Baits}
        />
      </FlexBoxCol>
    );
  };

  return (
    <Overlay visible={isVisible} title={'Tackle box'} onClose={hide}>
      {renderContent()}
    </Overlay>
  );
}

export default TackleBox;

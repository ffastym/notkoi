import { Overlay } from '../components/Overlay';
import { DialogProps } from '../types';
import { useUserQuery } from '../pages/Home/Home.operations.generated';

type ProfileAchievementDialogProps = DialogProps & {
  title: string;
  children: JSX.Element;
};

export function ProfileAchievementDialog({ hide, children, isVisible, title }: ProfileAchievementDialogProps) {
  const { data } = useUserQuery({ fetchPolicy: 'cache-and-network' });

  if (!data) return null;

  return (
    <Overlay
      visible={isVisible}
      title={title}
      onClose={hide}
      accept={{
        text: 'OK',
        action: hide,
      }}
    >
      {children}
    </Overlay>
  );
}

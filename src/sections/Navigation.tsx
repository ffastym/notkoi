import { BottomNavigation, BottomNavigationButton, BottomNavigationButtonImg } from '../components/styled/styled';

type NavigationProps = {
  buttons: Array<{
    action: () => void;
    picture: string;
  }>;
};
export function Navigation({ buttons }: NavigationProps) {
  return (
    <BottomNavigation>
      {buttons.map(({ action, picture }) => (
        <BottomNavigationButton key={picture}>
          <BottomNavigationButtonImg onClick={action} src={picture} alt={picture} />
        </BottomNavigationButton>
      ))}
    </BottomNavigation>
  );
  //     <BottomNavigationButton onClick={showTackleBox}>
  //   <BottomNavigationButtonImg src="/notkoi/img/toolbox.png" alt="" />
  //   </BottomNavigationButton>
  //   <BottomNavigationButton onClick={showBaitsBox}>
  // <BottomNavigationButtonImg src="/notkoi/img/worm (1).png" alt="" />
  // </BottomNavigationButton>
  // <BottomNavigationButton>
  // <BottomNavigationButtonImg onClick={showLeaderboard} src="/notkoi/img/leaderboard.png" alt="" />
  // </BottomNavigationButton>
  // <BottomNavigationButton>
  // <BottomNavigationButtonImg onClick={showProfile} src="/notkoi/img/fisher.png" alt="" />
  //   </BottomNavigationButton>
}

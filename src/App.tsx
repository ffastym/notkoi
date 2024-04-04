import './App.css';
import styled from 'styled-components';
import {
  BaitImg,
  BottomNavigation,
  BottomNavigationButton,
  BottomNavigationButtonImg,
  FlexBoxRow,
  Header,
  Rod,
} from './components/styled/styled';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import '@twa-dev/sdk';
import { Lake } from './components/Lake';
import { Overlay } from './components/Overlay';
import { useEffect, useState } from 'react';
import { ProgressBar } from './components/ProgressBar';

const StyledApp = styled.div`
  background-color: #e8e8e8;
  color: black;

  @media (prefers-color-scheme: dark) {
    background-color: #222;
    color: white;
  }
  min-height: 100vh;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

let loading: any = null;
let moving: any = null;
const PULLING_SPEED = 0.3;
// const PULLING_SPEED = 10;

const defaultBaitPosition = [50, 35];

function App() {
  const { network } = useTonConnect();
  const [baitTopPosition, setBaitTopPosition] = useState(defaultBaitPosition[1]);
  const [baitLeftPosition, setBaitLeftPosition] = useState(defaultBaitPosition[0]);
  const [loadingPercent, setLoadingPercent] = useState<number | null>(null);
  const [isLandingNetVisible, setIsLandingNetVisible] = useState(false);
  const [isTackleBoxVisible, setIsTackleBoxVisible] = useState(false);
  const [isBaitsBoxVisible, setIsBaitsBoxVisible] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isProfiledVisible, setIsProfileVisible] = useState(false);

  const resetToDefault = () => {
    clearInterval(loading);
    loading = null;
    clearInterval(moving);
    moving = 0;
    setBaitTopPosition(defaultBaitPosition[1]);
    setBaitLeftPosition(defaultBaitPosition[0]);
    setLoadingPercent(null);
  };

  const incLoad = () => {
    clearInterval(loading);

    if (!moving) {
      moving = setInterval(changeBaitLeftPosition, 50);
    }

    loading = setInterval(() => {
      setLoadingPercent((prevLoadingPercent) => {
        if (prevLoadingPercent === null) {
          return 1;
        }

        if (prevLoadingPercent === 100) {
          return 100;
        }

        if (baitTopPosition > 0) {
          setBaitTopPosition((prevBaitTopPosition) => prevBaitTopPosition - PULLING_SPEED);
        }

        return prevLoadingPercent + 1;
      });
    }, 50);
  };

  const decLoad = () => {
    clearInterval(loading);

    if (!moving) {
      moving = setInterval(changeBaitLeftPosition, 50);
    }

    loading = setInterval(() => {
      setLoadingPercent((prev) => {
        if (prev === null) {
          return 1;
        }

        if (prev === 0) {
          return 0;
        }

        if (baitTopPosition !== 40) {
          setBaitTopPosition((prev) => prev + 0.05);
        }

        return prev - 1;
      });
    }, 50);
  };

  const changeBaitLeftPosition = () => {
    setBaitLeftPosition((prev) => {
      if (prev === 0 || prev === 100) {
        return prev;
      }

      const random = Math.random();

      return prev + (random > 0.5 ? 0.2 : -0.2);
    });
  };

  const showLandingNet = () => {
    setIsLandingNetVisible(true);
  };

  const hideLandingNet = () => {
    setIsLandingNetVisible(false);
    resetToDefault();
  };

  const showTackleBox = () => {
    setIsTackleBoxVisible(true);
  };
  const hideTackleBox = () => {
    setIsTackleBoxVisible(false);
  };

  const showBaitsBox = () => {
    setIsBaitsBoxVisible(true);
  };

  const hideBaitsBox = () => {
    setIsBaitsBoxVisible(false);
  };

  const showLeaderboard = () => {
    setIsLeaderboardVisible(true);
  };

  const hideLeaderboard = () => {
    setIsLeaderboardVisible(false);
  };

  const showProfile = () => {
    setIsProfileVisible(true);
  };

  const hideProfile = () => {
    setIsProfileVisible(false);
  };

  useEffect(() => {
    if (baitTopPosition <= 0) {
      showLandingNet();
      resetToDefault();
    }
  }, [baitTopPosition]);

  return (
    <StyledApp>
      <AppContainer>
        <Lake />
        <Header>
          {/*<Button>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </Button>*/}
          <FlexBoxRow>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: 8 }}>
              <img style={{ marginRight: 8, height: 25, width: 25 }} src="/notkoi/img/coin.png" alt="" />
              <span style={{ color: '#fff', fontWeight: 500 }}>1 000</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img style={{ marginRight: 8, height: 25, width: 25 }} src="/notkoi/img/currency.png" alt="" />
              <span style={{ color: '#fff', fontWeight: 500 }}>25</span>
            </div>
          </FlexBoxRow>
          <TonConnectButton />
        </Header>
        {loadingPercent !== null && <ProgressBar percent={100 - loadingPercent} />}
        <BaitImg style={{ bottom: `${baitTopPosition}%`, left: `${baitLeftPosition}%` }} />
        <Rod />
        <BottomNavigation>
          <BottomNavigationButton onClick={showTackleBox}>
            <BottomNavigationButtonImg src="/notkoi/img/toolbox.png" alt="" />
          </BottomNavigationButton>
          <BottomNavigationButton onClick={showBaitsBox}>
            <BottomNavigationButtonImg src="/notkoi/img/worm (1).png" alt="" />
          </BottomNavigationButton>
          <BottomNavigationButton>
            <BottomNavigationButtonImg onClick={showLeaderboard} src="/notkoi/img/leaderboard.png" alt="" />
          </BottomNavigationButton>
          <BottomNavigationButton>
            <BottomNavigationButtonImg onClick={showProfile} src="/notkoi/img/fisher.png" alt="" />
          </BottomNavigationButton>
        </BottomNavigation>
        <button
          onTouchStart={incLoad}
          onTouchEnd={decLoad}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            zIndex: 1,
            position: 'absolute',
            right: 16,
            bottom: 100,
            background: 'rgba(255,255,255,.3)',
            border: '2px solid #fff',
            height: 75,
            width: 75,
            userSelect: 'none',
          }}
        >
          <img style={{ height: 45, width: 45 }} src="/notkoi/img/reels-2-white.png" alt="" />
        </button>
        <Overlay
          visible={isLandingNetVisible}
          title={'You catch the fish!'}
          accept={{
            text: (
              <>
                <span style={{ color: '#fff' }}>Sell</span>
                <img style={{ margin: '0 5px 0 10px', height: 16, width: 16 }} src="/notkoi/img/coin.png" alt="" />
                <span style={{ color: '#fff' }}>5</span>
              </>
            ),
            action: hideLandingNet,
          }}
          reject={{ text: 'Release', action: hideLandingNet }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ marginTop: -32 }} src="/notkoi/img/token.png" alt="" />
            <span style={{ fontSize: 18, fontWeight: 500, marginTop: -28 }}>Koi fish</span>
          </div>
        </Overlay>

        <Overlay
          visible={isTackleBoxVisible}
          title={'Tackle box'}
          accept={{
            text: 'OK',
            action: hideTackleBox,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ height: 100, width: 100 }} src="/notkoi/img/coming-soon.png" alt="" />
            <span style={{ marginTop: 16, fontWeight: 500, textAlign: 'center' }}>
              Buy a fishing equipment to catch more and faster
            </span>
          </div>
        </Overlay>

        <Overlay
          visible={isBaitsBoxVisible}
          title={'Baits box'}
          accept={{
            text: 'OK',
            action: hideBaitsBox,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ height: 100, width: 100 }} src="/notkoi/img/coming-soon.png" alt="" />
            <span style={{ marginTop: 16, fontWeight: 500, textAlign: 'center' }}>
              Buy a fishing baits to increase a chance to catch a Koi fish!
            </span>
          </div>
        </Overlay>

        <Overlay
          visible={isLeaderboardVisible}
          title={'Leaderboard'}
          accept={{
            text: 'OK',
            action: hideLeaderboard,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ height: 100, width: 100 }} src="/notkoi/img/coming-soon.png" alt="" />
            <span style={{ marginTop: 16, fontWeight: 500, textAlign: 'center' }}>
              Your score in the fisherman rating
            </span>
          </div>
        </Overlay>

        <Overlay
          visible={isProfiledVisible}
          title={'Profile'}
          accept={{
            text: 'OK',
            action: hideProfile,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ height: 100, width: 100 }} src="/notkoi/img/coming-soon.png" alt="" />
            <span style={{ marginTop: 16, fontWeight: 500, textAlign: 'center' }}>
              Your profile, friends, rewards, etc.
            </span>
          </div>
        </Overlay>
      </AppContainer>
    </StyledApp>
  );
}

export default App;

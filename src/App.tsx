import './App.css';
import styled from 'styled-components';
import { BaitImg, Rod } from './components/styled/styled';
import '@twa-dev/sdk';
import { Lake } from './components/Lake';
import { useEffect, useState } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { Profile } from './sections/Profile';
import { Leaderboard } from './sections/Leaderboard';
import { BaitsBox } from './sections/BaitsBox';
import { TackleBox } from './sections/TackleBox';
import { LandingNet } from './sections/LandingNet';
import { Navigation } from './sections/Navigation';
import { Header } from './sections/Header';
import { PullButton } from './sections/PullButton';
import { useCatchFishLazyQuery, useNewChatMessageSubscription, useSellFishMutation } from './App.operations.generated';
import { User } from './generated/types';

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

function App({ user }: { user: User }) {
  const [baitTopPosition, setBaitTopPosition] = useState(defaultBaitPosition[1]);
  const [baitLeftPosition, setBaitLeftPosition] = useState(defaultBaitPosition[0]);
  const [loadingPercent, setLoadingPercent] = useState<number | null>(null);
  const [isLandingNetVisible, setIsLandingNetVisible] = useState(false);
  const [isTackleBoxVisible, setIsTackleBoxVisible] = useState(false);
  const [isBaitsBoxVisible, setIsBaitsBoxVisible] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isProfiledVisible, setIsProfileVisible] = useState(false);
  const [isBiting, setIsBiting] = useState(false);

  const { data } = useNewChatMessageSubscription({
    shouldResubscribe: true,
    fetchPolicy: 'no-cache',
  });

  const [catchFish, { data: catchFishData }] = useCatchFishLazyQuery({ fetchPolicy: 'no-cache' });
  const [sell] = useSellFishMutation({ fetchPolicy: 'no-cache' });

  const resetToDefault = () => {
    clearInterval(loading);
    loading = null;
    clearInterval(moving);
    moving = 0;
    setBaitTopPosition(defaultBaitPosition[1]);
    setBaitLeftPosition(defaultBaitPosition[0]);
    setLoadingPercent(null);
    setIsBiting(false);
  };

  const incLoad = () => {
    if (!isBiting) {
      return;
    }

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
    if (!isBiting) {
      return;
    }

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
      catchFish().then(() => {
        showLandingNet();
        resetToDefault();
      });
    }
  }, [baitTopPosition, catchFish]);

  useEffect(() => {
    if (data?.newChatMessage) {
      setIsBiting(true);

      if (!moving) {
        moving = setInterval(changeBaitLeftPosition, 50);
      }
    }
  }, [data]);

  const sellFish = async (fishId: number) => {
    await sell({ variables: { fishId } });
    hideLandingNet();
  };

  return (
    <StyledApp>
      <AppContainer>
        <Lake />
        <Header coins={user.coins} />
        {loadingPercent !== null && <ProgressBar percent={100 - loadingPercent} />}
        <BaitImg style={{ bottom: `${baitTopPosition}%`, left: `${baitLeftPosition}%` }} />
        <Rod />
        {isBiting && (
          <h1 style={{ color: 'white', position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%' }}>
            BITING!!!
          </h1>
        )}
        <Navigation
          buttons={[
            { picture: '/img/toolbox.png', action: showTackleBox },
            { picture: '/img/worm (1).png', action: showBaitsBox },
            { picture: '/img/leaderboard.png', action: showLeaderboard },
            { picture: '/img/fisher.png', action: showProfile },
          ]}
        />
        <PullButton onPull={incLoad} onPush={decLoad} />
        {catchFishData && (
          <LandingNet
            hide={hideLandingNet}
            isVisible={isLandingNetVisible}
            sell={sellFish}
            fish={catchFishData.catchFish}
          />
        )}
        <TackleBox isVisible={isTackleBoxVisible} hide={hideTackleBox} />
        <BaitsBox hide={hideBaitsBox} isVisible={isBaitsBoxVisible} />
        <Leaderboard isVisible={isLeaderboardVisible} hide={hideLeaderboard} />
        <Profile hide={hideProfile} isVisible={isProfiledVisible} />
      </AppContainer>
    </StyledApp>
  );
}

export default App;

import styled from 'styled-components';
import { BaitImg, LakePicture, Rod } from '../../components/styled/styled';
import '@twa-dev/sdk';
import { TouchEventHandler, useEffect, useState } from 'react';
import { ProgressBar } from '../../components/ProgressBar';
import { Profile } from '../../sections/Profile';
import { Leaderboard } from '../../sections/Leaderboard';
import TackleBox from '../../sections/TackleBox';
import { LandingNet } from '../../sections/LandingNet';
import { Navigation } from '../../sections/Navigation';
import { Header } from '../../sections/Header';
import { PullButton } from '../../sections/PullButton';
import {
  LoginDataFragment,
  LoginDataFragmentDoc,
  useBitingSubscription,
  useCatchFishLazyQuery,
  useReleaseFishMutation,
  useSellFishMutation,
} from '../../App.operations.generated';
import { client } from '../../config/apollo';
import { useTelegram } from '../../hooks/useTelegram';
import { useNavigate } from 'react-router-dom';
import { AppRoute, getRouteWithSlash } from '../../types/AppRoute';

const StyledApp = styled.div`
  min-height: 100vh;
`;

const AppContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

let loading: any = null;
let moving: any = null;
const PULLING_SPEED = 0.5;
// const PULLING_SPEED = 10;

const defaultBaitPosition = [50, 35];

function Home({ user, balance }: { user: LoginDataFragment; balance: string }) {
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const [baitTopPosition, setBaitTopPosition] = useState(defaultBaitPosition[1]);
  const [baitLeftPosition, setBaitLeftPosition] = useState(defaultBaitPosition[0]);
  const [loadingPercent, setLoadingPercent] = useState<number | null>(null);
  const [isLandingNetVisible, setIsLandingNetVisible] = useState(false);
  const [isTackleBoxVisible, setIsTackleBoxVisible] = useState(false);
  const [isLeaderboardVisible, setIsLeaderboardVisible] = useState(false);
  const [isProfiledVisible, setIsProfileVisible] = useState(false);
  const [bitingPower, setBitingPower] = useState(0);

  const { data: bitingData } = useBitingSubscription({
    shouldResubscribe: true,
    fetchPolicy: 'no-cache',
  });

  const [catchFish, { data: catchFishData }] = useCatchFishLazyQuery({ fetchPolicy: 'no-cache' });
  const [sell] = useSellFishMutation({ fetchPolicy: 'no-cache' });
  const [release] = useReleaseFishMutation({ fetchPolicy: 'no-cache' });

  const resetToDefault = () => {
    clearInterval(loading);
    loading = null;
    clearInterval(moving);
    moving = 0;
    setBaitTopPosition(defaultBaitPosition[1]);
    setBaitLeftPosition(defaultBaitPosition[0]);
    setLoadingPercent(null);
    setBitingPower(0);
  };

  const preventSelection: TouchEventHandler = (e) => {
    e.preventDefault();
  };

  const incLoad: TouchEventHandler = (e) => {
    preventSelection(e);

    if (!bitingPower) {
      return;
    }

    clearInterval(loading);

    if (!moving) {
      moving = setInterval(changeBaitLeftPosition, 50);
    }

    loading = setInterval(() => {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      setLoadingPercent((prevLoadingPercent) => {
        if (prevLoadingPercent === null) {
          return 1;
        }

        if (prevLoadingPercent >= 100) {
          showFishGone();
          resetToDefault();
          return 100;
        }

        if (baitTopPosition > 0) {
          setBaitTopPosition((prevBaitTopPosition) => prevBaitTopPosition - PULLING_SPEED);
        }

        return prevLoadingPercent + bitingPower;
      });
    }, 50);
  };

  const decLoad: TouchEventHandler = (e) => {
    preventSelection(e);

    if (!bitingPower) {
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

        if (prev <= 0) {
          showFishGone();
          resetToDefault();
          return 0;
        }

        if (baitTopPosition !== 40) {
          setBaitTopPosition((prev) => prev + 0.05);
        }

        return prev - bitingPower;
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

  const showFriends = () => {
    navigate(getRouteWithSlash(AppRoute.FRIENDS));
  };

  const showLeaderboard = () => {
    setIsLeaderboardVisible(true);
  };

  const hideLeaderboard = () => {
    setIsLeaderboardVisible(false);
  };

  const showFishGone = () => {
    try {
      tg.HapticFeedback.notificationOccurred('error');
      tg.showAlert('Oops... Your fish is gone 😢. Try to pull the fish more carefully');
    } catch (e) {
      console.error(e);
    }
  };

  const showProfile = () => {
    setIsProfileVisible(true);
  };

  const hideProfile = () => {
    setIsProfileVisible(false);
  };

  useEffect(() => {
    if (baitTopPosition <= 0 && bitingData?.biting) {
      catchFish({ variables: { bitingId: bitingData.biting.id } }).then(() => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('rigid');
        showLandingNet();
        resetToDefault();
      });
    }
  }, [baitTopPosition, bitingData?.biting, catchFish]);

  useEffect(() => {
    if (bitingData?.biting) {
      setBitingPower(bitingData.biting.power);
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');

      if (!moving) {
        moving = setInterval(changeBaitLeftPosition, 50);
      }
    }
  }, [bitingData]);

  const updateCoins = (coins: number) => {
    client.cache.updateFragment(
      {
        fragment: LoginDataFragmentDoc,
        id: `User:${user.id}`,
      },
      (prevLoginData: any) => {
        return { ...prevLoginData, coins: prevLoginData.coins + coins };
      },
    );
  };

  const sellFish = async (bitingId: string) => {
    const { data } = await sell({ variables: { bitingId } });

    if (data) {
      updateCoins(data.sellFish);
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }

    hideLandingNet();
  };

  const releaseFish = async (bitingId: string) => {
    const { data } = await release({ variables: { bitingId } });

    if (data) {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }

    hideLandingNet();
  };

  useEffect(() => {
    tg.expand();
  }, [tg]);

  return (
    <StyledApp>
      <AppContainer>
        <LakePicture onTouchStart={preventSelection} onTouchEnd={preventSelection} />
        <Header coins={+user.coins} style={{ color: '#fff' }} balance={balance} />
        {loadingPercent !== null && <ProgressBar percent={100 - loadingPercent} />}
        <BaitImg
          onTouchStart={preventSelection}
          onTouchEnd={preventSelection}
          style={{ bottom: `${baitTopPosition}%`, left: `${baitLeftPosition}%` }}
        />
        <Rod onTouchStart={preventSelection} onTouchEnd={preventSelection} />
        {bitingPower > 0 && (
          <h1 style={{ color: 'white', position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%' }}>
            BITING!!!
          </h1>
        )}
        <Navigation
          buttons={[
            { picture: '/img/toolbox.png', action: showTackleBox },
            { picture: '/img/leaderboard.png', action: showLeaderboard },
            { picture: '/img/support.png', action: showFriends },
            { picture: '/img/fisher.png', action: showProfile },
          ]}
        />
        {bitingPower > 0 && <PullButton onPull={incLoad} onPush={decLoad} />}
        {catchFishData && (
          <LandingNet
            hide={hideLandingNet}
            isVisible={isLandingNetVisible}
            sell={sellFish}
            release={releaseFish}
            biting={catchFishData.catchFish}
          />
        )}
        {isTackleBoxVisible && (
          <TackleBox isVisible={isTackleBoxVisible} hide={hideTackleBox} tackleBoxId={user.tackleBoxId} />
        )}
        {isLeaderboardVisible && <Leaderboard isVisible={isLeaderboardVisible} hide={hideLeaderboard} />}
        {isProfiledVisible && <Profile hide={hideProfile} isVisible={isProfiledVisible} />}
      </AppContainer>
    </StyledApp>
  );
}

export default Home;

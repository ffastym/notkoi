import "./App.css";
import { Jetton } from "./components/Jetton";
import styled from "styled-components";
import {
  BaitImg,
  BottomNavigation, BottomNavigationButton, BottomNavigationButtonImg,
  Button,
  FlexBoxCol,
  FlexBoxRow,
  Header, Rod
} from "./components/styled/styled";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk"
import { Lake } from "./components/Lake";
import { Overlay } from "./components/Overlay";

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

function App() {
  const {network} = useTonConnect()

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
            <TonConnectButton/>
          </Header>
          <Rod/>
        <BaitImg/>
        <BottomNavigation>
          <BottomNavigationButton><BottomNavigationButtonImg src="/img/reels.png" alt=""/></BottomNavigationButton>
          <BottomNavigationButton><BottomNavigationButtonImg src="/img/worm (1).png" alt=""/></BottomNavigationButton>
          <BottomNavigationButton><BottomNavigationButtonImg src="/img/fish (1).png" alt=""/></BottomNavigationButton>
        </BottomNavigation>
        <Overlay title={"You catch the fish!"} accept={{text: "Sell"}} reject={{text: "Release"}}>
          <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <img style={{marginTop: -32}} src="/img/token.png" alt=""/>
            <span style={{fontSize: 18, fontWeight: 500, marginTop: -28}}>Koi fish</span>
          </div>
        </Overlay>
      </AppContainer>
    </StyledApp>
  );
}

export default App;

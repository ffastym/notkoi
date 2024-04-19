import styled from 'styled-components';

export const FlexBoxRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const FlexBoxCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.disabled ? '#6e6e6e' : 'var(--tg-theme-button-color)')};
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  color: #ffffff;
  font-weight: 700;
  width: 100%;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'inherit')};
  display: flex;
  justify-content: center;
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-height: 100%;
`;

export const LakePicture = styled.div`
  background: url('/img/lake-1.jpg') no-repeat top;
  background-size: cover;
  width: 100%;
  height: 100vh;
`;

export const Header = styled.div`
  width: 100%;
  padding: 16px;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  justify-content: space-between;
`;

export const Rod = styled.div`
  position: absolute;
  bottom: 0;
  background: url('/img/rod.png') no-repeat top;
  background-size: contain;
  width: 100%;
  height: 350px;
`;

export const BottomNavigation = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 32px);
  display: flex;
  border-radius: 25px;
  background: rgba(192, 192, 192, 0.6);
  margin: 16px;
`;

export const BottomNavigationButton = styled.span`
  height: 50px;
  width: 100%;
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:not(:last-of-type):after {
    position: absolute;
    content: '';
    display: block;
    width: 1px;
    height: 50%;
    right: 0;
    background: #bbbbbb;
  }
`;

export const BottomNavigationButtonImg = styled.img`
  max-height: 100%;
`;

export const BaitImg = styled.span`
  display: block;
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: 35%;
  left: 50%;
  background: url('/img/fishing-baits.png') no-repeat center;
  background-size: contain;
`;

export default { Header };

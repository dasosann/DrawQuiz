import styled, { keyframes } from 'styled-components';

// 3D 옆 회전 애니메이션
const rotate = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
`;

const slideUpFadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-5vh);
  }
`;

const slideDownFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5vh);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NeonText = styled.div`
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  text-shadow: 
    0 0 5px #ff00ff,
    0 0 10px #ff00ff,
    0 0 20px #0000ff,
    0 0 40px #0000ff;
  letter-spacing: -0.03em;
  text-align: center;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: manipulation;

  @supports (-webkit-touch-callout: none) {
    -webkit-touch-callout: none;
  }
`;

const CustomNeonText = styled(NeonText)<{ isClosing?: boolean; isOpening?: boolean }>`
  font-size: 3.288vh;
  color: #fff;
  text-shadow: 
    0 0 0.233vw #ff6200,
    0 0 0.466vw #ff6200,
    0 0 0.932vw #ff6200,
    0 0 1.864vw #ff6200;
  animation: ${({ isClosing, isOpening }) =>
    isClosing
      ? slideUpFadeOut
      : isOpening
      ? slideDownFadeIn
      : 'none'} 0.5s ease-out forwards;
`;

const ThemeNeonText = styled(NeonText)`
  cursor: pointer;
  font-size: 3.288vh;
  color: #fff;
  text-shadow: 
    0 0 0.233vw #FFFF00,
    0 0 0.466vw #39ff14,
    0 0 0.932vw #FFFF00,
    0 0 1.864vw #39ff14;
  transition: color 0.3s ease, text-shadow 0.3s ease;

  &:hover {
    text-shadow: 
      0 0 0.3vw #FFFF00,
      0 0 0.6vw #FFFF00,
      0 0 1.2vw #FFFF00,
      0 0 2.4vw #FFFF00;
  }
`;

const BackGroundDiv = styled.div`
  position: relative;
  user-select: none;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background-image: url(/assets/img/background1.png);
  background-size: 1024px 1024px;
  background-position: center;
  padding: 6.85vh 7.3vw;
  animation: moveBackground 50s linear infinite;

  @keyframes moveBackground {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  @media (max-width: 430px) {
    background-size: 130%;
  }

  @media (max-height: 932px) {
    background-size: 130%;
  }
`;

const MenuWrapper = styled.div``;

// 테마 선택 화면을 감싸는 div에 애니메이션 적용
const ThemeSelectionWrapper = styled.div<{ isClosing?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  animation: ${({ isClosing }) =>
    isClosing ? slideUpFadeOut : 'none'} 0.5s ease-out forwards;
`;

const RotatingCard = styled.img`
  width: 200px;
  height: auto;
  display: block;
  margin: 10vh auto;
  animation: ${rotate} 1.5s ease-in-out infinite;
`;

export default {
  BackGroundDiv,
  NeonText,
  CustomNeonText,
  ThemeNeonText,
  MenuWrapper,
  RotatingCard,
  ThemeSelectionWrapper, // 새로운 컴포넌트 추가
};
import React, { useState, useEffect } from 'react';
import S from '../styles/StartGame';

interface StartGameProps {
  onThemeSelect: (theme: string) => void;
}

const StartGame: React.FC<StartGameProps> = ({ onThemeSelect }) => {
  const [isStartButtonVisible, setIsStartButtonVisible] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isOpening, setIsOpening] = useState<boolean>(false);
  const [isThemeClosing, setIsThemeClosing] = useState<boolean>(false);

  const themes: string[] = ['프론트엔드', '백엔드', '인공지능'];

  const handleStartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.history.pushState({ page: 'theme' }, '', '');
    setIsClosing(true);
    setTimeout(() => {
      setIsStartButtonVisible(false);
      setIsClosing(false);
    }, 500);
  };

  useEffect(() => {
    window.history.pushState({ page: 'start' }, '', '');

    const handlePopState = (event: PopStateEvent) => {
      if (!isStartButtonVisible) {
        setIsThemeClosing(true);
        setTimeout(() => {
          setIsStartButtonVisible(true);
          setIsClosing(false);
          setIsOpening(true);
          setIsThemeClosing(false);
          window.history.pushState({ page: 'start' }, '', '');
        }, 500);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isStartButtonVisible]);
  
  return (
    <S.BackGroundDiv>
      <S.NeonText>DrawQuiz</S.NeonText>
      <S.RotatingCard src="/assets/img/main-card.png" alt="카드" />
      <S.MenuWrapper>
        {isStartButtonVisible ? (
          <S.CustomNeonText
            isClosing={isClosing}
            isOpening={isOpening}
            onClick={handleStartClick}
          >
            게임 시작
          </S.CustomNeonText>
        ) : (
          <S.ThemeSelectionWrapper isClosing={isThemeClosing}>
            <S.CustomNeonText style={{ marginBottom: '2vh' }}>
              테마를 선택하세요.
            </S.CustomNeonText>
            {themes.map((theme: string, index: number) => (
              <S.ThemeNeonText
                key={index}
                onClick={() => onThemeSelect(theme)}
                style={{ cursor: 'pointer' }}
              >
                {theme}
              </S.ThemeNeonText>
            ))}
          </S.ThemeSelectionWrapper>
        )}
      </S.MenuWrapper>
    </S.BackGroundDiv>
  );
};

export default StartGame;
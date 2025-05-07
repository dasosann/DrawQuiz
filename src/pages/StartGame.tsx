import React, { useState, useEffect } from 'react';
import S from '../css/StartGame';

const StartGame: React.FC = () => {
  const [isStartButtonVisible, setIsStartButtonVisible] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);  // "게임 시작 버튼 사라질때 애니메이션 용 상태"
  const [isOpening, setIsOpening] = useState<boolean>(false); // "게임 시작" 버튼 나타날 때 애니메이션용 상태"
  const [isThemeClosing, setIsThemeClosing] = useState<boolean>(false); // 테마 선택 화면 사라질 때 애니메이션용 상태

  const themes: string[] = [
    '프론트엔드',
    '백엔드',
    '인공지능',
    // 새로운 테마 추가 가능 (예: '클라우드')
  ];

  const handleStartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    window.history.pushState({ page: 'game' }, '', '');
    setIsClosing(true);
    setTimeout(() => {
      setIsStartButtonVisible(false);
      setIsClosing(false); // 애니메이션 종료 후 초기화
    }, 500);
  };

  useEffect(() => {
    // 초기 마운트 시 더미 히스토리 항목 추가
    window.history.pushState({ page: 'start' }, '', '');

    const handlePopState = (event: PopStateEvent) => {
      if (!isStartButtonVisible) {
        // 테마 선택 화면일 때만 애니메이션 트리거
        setIsThemeClosing(true);
        setTimeout(() => {
          setIsStartButtonVisible(true);
          setIsClosing(false);
          setIsOpening(true); // "게임 시작" 버튼 나타날 때 애니메이션
          setIsThemeClosing(false); // 애니메이션 종료 후 초기화
          window.history.pushState({ page: 'start' }, '', '');
        }, 500); // slideUpFadeOut 애니메이션 시간(0.5초)과 동기화
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isStartButtonVisible]); // isStartButtonVisible 변경 시 리스너 업데이트

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
              <S.ThemeNeonText key={index}>{theme}</S.ThemeNeonText>
            ))}
          </S.ThemeSelectionWrapper>
        )}
      </S.MenuWrapper>
    </S.BackGroundDiv>
  );
};

export default StartGame;
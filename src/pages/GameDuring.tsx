// src/pages/GameDuring.tsx
import React, { useState, useEffect } from 'react';
import G from '../css/GameDuring.ts';

interface GameDuringProps {
  theme: string;
}

interface Quiz {
  question: string;
  answer: string;
}

// 테마별 보스와 퀴즈 데이터 (50개 질문 예시)
const themeData: Record<string, { boss: { name: string; image: string }; quizzes: Quiz[] }> = {
  프론트엔드: {
    boss: { name: 'React 마스터', image: '/assets/img/boss-frontend.png' },
    quizzes: [
      { question: 'React에서 상태를 관리하는 Hook은?', answer: 'useState' },
      { question: 'JSX의 풀네임은?', answer: 'JavaScript XML' },
      { question: '컴포넌트 생명주기를 관리하는 Hook은?', answer: 'useEffect' },
      { question: 'Virtual DOM의 주요 장점은?', answer: '성능 최적화' },
      { question: 'React의 단방향 데이터 흐름이란?', answer: '부모에서 자식으로 데이터 전달' },
      ...Array(45).fill().map((_, i) => ({
        question: `프론트엔드 질문 ${i + 6}`,
        answer: `답변 ${i + 6}`,
      })),
    ],
  },
  백엔드: {
    boss: { name: 'Node.js 거인', image: '/assets/img/boss-backend.png' },
    quizzes: [
      { question: 'REST API의 약자는?', answer: 'Representational State Transfer' },
      { question: 'Express.js에서 미들웨어의 역할은?', answer: '요청 처리' },
      { question: 'HTTP GET 메서드의 용도는?', answer: '데이터 조회' },
      { question: 'SQL과 NoSQL의 주요 차이는?', answer: '스키마 유무' },
      { question: 'OAuth의 주요 목적은?', answer: '인증' },
      ...Array(45).fill().map((_, i) => ({
        question: `백엔드 질문 ${i + 6}`,
        answer: `답변 ${i + 6}`,
      })),
    ],
  },
  인공지능: {
    boss: { name: 'AI 오라클', image: '/assets/img/boss-ai.png' },
    quizzes: [
      { question: '딥러닝의 핵심 기술은?', answer: '신경망' },
      { question: 'Gradient Descent의 목적은?', answer: '손실 최소화' },
      { question: '오버피팅을 방지하는 방법은?', answer: '정규화' },
      { question: 'CNN은 주로 어떤 작업에 사용되나?', answer: '이미지 처리' },
      { question: 'Transformer 모델의 주요 구성 요소는?', answer: 'Attention' },
      ...Array(45).fill().map((_, i) => ({
        question: `AI 질문 ${i + 6}`,
        answer: `답변 ${i + 6}`,
      })),
    ],
  },
};

const GameDuring: React.FC<GameDuringProps> = ({ theme }) => {
  const { boss, quizzes } = themeData[theme] || { boss: { name: 'Unknown', image: '' }, quizzes: [] };
  const [randomQuiz, setRandomQuiz] = useState<Quiz | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    if (quizzes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quizzes.length);
      setRandomQuiz(quizzes[randomIndex]);
    }
  }, [quizzes]);

  const handleSubmit = () => {
    if (randomQuiz && userAnswer.trim().toLowerCase() === randomQuiz.answer.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <S.BackGroundDiv>
      <G.Content>
        <G.BossImage src={boss.image} alt={boss.name} />
        <G.BossName>{boss.name}</G.BossName>
        <G.Question>{randomQuiz ? randomQuiz.question : '질문이 없습니다.'}</G.Question>
        <G.AnswerInput
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="답변을 입력하세요"
        />
        <G.SubmitButton onClick={handleSubmit}>제출</G.SubmitButton>
        {isCorrect !== null && (
          <G.ResultMessage isCorrect={isCorrect}>
            {isCorrect ? '정답입니다!' : '오답입니다.'}
          </G.ResultMessage>
        )}
      </G.Content>
    </S.BackGroundDiv>
  );
};

export default GameDuring;
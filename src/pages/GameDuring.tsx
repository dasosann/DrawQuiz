// src/pages/GameDuring.tsx
import React, { useState, useEffect } from 'react';
import G from '../css/GameDuring.ts';
import S from '../css/StartGame.ts';
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
    boss: { name: 'React 마스터', image: '/assets/gameItems/frontend_boss.png' },
    quizzes: [
      { question: 'React에서 상태를 관리하는 Hook은?', answer: 'useState' },
      { question: 'JSX의 풀네임은?', answer: 'JavaScript XML' },
      { question: '컴포넌트 생명주기를 관리하는 Hook은?', answer: 'useEffect' },
      { question: 'Virtual DOM의 주요 장점은?', answer: '성능 최적화' },
      { question: 'React의 단방향 데이터 흐름의 방향은?', answer: '부모에서 자식' },
      { question: 'React에서 함수 컴포넌트를 정의하는 키워드는?', answer: 'function' },
      { question: 'Props를 전달하는 주요 방법은?', answer: '속성' },
      { question: 'useRef Hook의 주요 용도는?', answer: '참조 유지' },
      { question: 'React에서 조건부 렌더링에 자주 쓰이는 연산자는?', answer: '&&' },
      { question: 'React의 기본 패키지 이름은?', answer: 'react' },
      { question: 'DOM을 조작하기 위한 Hook은?', answer: 'useRef' },
      { question: 'React에서 이벤트 핸들러를 정의하는 속성은?', answer: 'onClick' },
      { question: 'CSS-in-JS 라이브러리 중 하나는?', answer: 'styled-components' },
      { question: 'React에서 라우팅을 위해 주로 사용하는 라이브러리는?', answer: 'react-router' },
      { question: '상태 관리 라이브러리 중 하나는?', answer: 'Redux' },
      { question: 'React에서 키 prop의 주요 용도는?', answer: '목록 렌더링' },
      { question: 'React의 기본 렌더링 메서드는?', answer: 'render' },
      { question: 'React에서 비제어 컴포넌트를 다룰 때 사용하는 속성은?', answer: 'ref' },
      { question: 'React에서 메모이제이션을 위한 Hook은?', answer: 'useMemo' },
      { question: '콜백 함수를 메모이제이션하는 Hook은?', answer: 'useCallback' },
      { question: 'React에서 전역 상태를 관리하는 Hook은?', answer: 'useContext' },
      { question: 'React의 기본 export 방식은?', answer: 'default' },
      { question: 'React에서 클래스 컴포넌트의 상태를 설정하는 메서드는?', answer: 'setState' },
      { question: 'React에서 컴포넌트 이름을 지정할 때의 규칙은?', answer: '대문자' },
      { question: 'React에서 기본적으로 사용하는 패키지 매니저는?', answer: 'npm' },
      { question: 'React 프로젝트를 빠르게 시작하는 도구는?', answer: 'create-react-app' },
      { question: 'React에서 타입을 정의하는 데 자주 사용하는 언어는?', answer: 'TypeScript' },
      { question: 'React에서 성능 최적화를 위한 도구는?', answer: 'React DevTools' },
      { question: 'React에서 기본적으로 사용하는 테스트 라이브러리는?', answer: 'Jest' },
      { question: 'React에서 컴포넌트 간 데이터 전달을 위한 패턴은?', answer: 'props drilling' },
    ],
  },
  백엔드: {
    boss: { name: 'Node.js 거인', image: '/assets/gameItems/backend_boss.png' },
    quizzes: [
      { question: 'REST API의 약자는?', answer: 'Representational State Transfer' },
      { question: 'Express.js에서 미들웨어의 역할은?', answer: '요청 처리' },
      { question: 'HTTP GET 메서드의 용도는?', answer: '데이터 조회' },
      { question: 'SQL과 NoSQL의 주요 차이는?', answer: '스키마 유무' },
      { question: 'OAuth의 주요 목적은?', answer: '인증' },
      { question: 'Node.js의 기본 모듈 시스템은?', answer: 'CommonJS' },
      { question: 'HTTP 상태 코드 404는 무엇을 의미하나?', answer: 'Not Found' },
      { question: '백엔드에서 데이터베이스와 상호작용하는 언어는?', answer: 'SQL' },
      { question: 'Express.js에서 라우팅을 정의하는 메서드는?', answer: 'get' },
      { question: 'Node.js에서 비동기 처리를 위한 기본 객체는?', answer: 'Promise' },
      { question: 'REST API에서 POST 메서드의 용도는?', answer: '데이터 생성' },
      { question: 'MongoDB의 기본 데이터 구조는?', answer: 'BSON' },
      { question: '백엔드에서 세션을 관리하는 데 사용하는 기술은?', answer: '쿠키' },
      { question: 'HTTP 상태 코드 200은 무엇을 의미하나?', answer: 'OK' },
      { question: 'Node.js에서 파일 시스템을 다루는 모듈은?', answer: 'fs' },
      { question: 'Express.js에서 요청 본문을 파싱하는 미들웨어는?', answer: 'body-parser' },
      { question: '백엔드에서 인증을 위해 자주 사용하는 토큰은?', answer: 'JWT' },
      { question: 'MySQL의 기본 포트 번호는?', answer: '3306' },
      { question: 'Node.js에서 환경 변수를 관리하는 패키지는?', answer: 'dotenv' },
      { question: 'REST API에서 DELETE 메서드의 용도는?', answer: '데이터 삭제' },
      { question: '백엔드에서 캐싱을 위해 자주 사용하는 도구는?', answer: 'Redis' },
      { question: 'Node.js에서 HTTP 서버를 생성하는 모듈은?', answer: 'http' },
      { question: 'Express.js에서 정적 파일을 제공하는 메서드는?', answer: 'static' },
      { question: '백엔드에서 로깅을 위해 자주 사용하는 라이브러리는?', answer: 'winston' },
      { question: 'Node.js에서 비동기 함수를 선언하는 키워드는?', answer: 'async' },
      { question: 'REST API에서 PUT 메서드의 용도는?', answer: '데이터 업데이트' },
      { question: '백엔드에서 데이터베이스 연결을 관리하는 도구는?', answer: 'ORM' },
      { question: 'Node.js에서 패키지를 관리하는 기본 도구는?', answer: 'npm' },
      { question: 'HTTP 상태 코드 500은 무엇을 의미하나?', answer: '서버 오류' },
      { question: '백엔드에서 API 문서를 생성하는 도구는?', answer: 'Swagger' },
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
      { question: 'AI에서 학습 데이터를 분할하는 비율은?', answer: '80:20' },
      { question: '신경망에서 활성화 함수의 역할은?', answer: '비선형성 추가' },
      { question: '머신러닝의 지도 학습의 예시는?', answer: '분류' },
      { question: 'AI에서 데이터 전처리의 주요 단계는?', answer: '정규화' },
      { question: 'RNN의 주요 용도는?', answer: '시퀀스 처리' },
      { question: 'AI에서 손실 함수의 역할은?', answer: '오차 측정' },
      { question: '딥러닝 프레임워크 중 하나는?', answer: 'TensorFlow' },
    ],
  },
};

const GameDuring: React.FC<GameDuringProps> = ({ theme }) => {
  const { boss, quizzes } = themeData[theme];
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
// src/pages/GameDuring.tsx
import React, { useState, useEffect, useRef } from 'react';
import S from '../styles/StartGame'; // 경로 수정
import G from '../styles/GameDuring';

interface GameDuringProps {
  theme: string;
}

interface Quiz {
  question: string;
  answer: string;
}

const themeData: Record<string, { boss: { name: string; image: string }; quizzes: Quiz[] }> = {
  프론트엔드: {
    boss: { name: 'React 마스터', image: '/assets/gameItems/frontend_boss.png' },
    quizzes: [
    { question: 'React 함수형 컴포넌트에서 상태(state)를 관리하기 위해 사용하는 Hook은?', answer: 'useState' },
    { question: 'JSX란 무엇이며, 왜 React에서 사용하는가?', answer: 'JSX' },
    { question: '컴포넌트가 마운트·업데이트될 때 부수 효과(side effect)를 처리하기 위해 사용하는 Hook은?', answer: 'useEffect' },
    { question: 'React가 빠르게 화면을 업데이트할 수 있게 해 주는 기술은?', answer: 'Virtual DOM' },
    { question: 'React에서 데이터는 어떤 방향으로 흐르는가?', answer: '부모에서 자식' },
    { question: 'React 컴포넌트를 정의할 때 사용하는 JavaScript 키워드는?', answer: 'function' },
    { question: '부모 컴포넌트가 자식 컴포넌트에 데이터를 전달할 때 사용하는 속성은?', answer: 'props' },
    { question: 'DOM 요소에 직접 접근하거나 값을 기억하기 위해 사용하는 Hook은?', answer: 'useRef' },
    { question: '조건부 렌더링을 위해 자주 사용하는 JavaScript 논리 연산자는?', answer: '&&' },
    { question: 'React 패키지를 프로젝트에 설치할 때 사용하는 npm 패키지 이름은?', answer: 'react' },
    { question: '버튼 클릭 이벤트를 처리하기 위해 JSX에서 사용하는 속성은?', answer: 'onClick' },
    { question: 'CSS-in-JS 방식으로 스타일링할 때 많이 쓰이는 라이브러리는?', answer: 'styled-components' },
    { question: 'SPA에서 페이지 이동을 관리하기 위해 사용하는 라이브러리는?', answer: 'react-router' },
    { question: '전역 상태 관리를 위해 주로 사용하는 라이브러리는?', answer: 'Redux' },
    { question: '리스트를 렌더링할 때 각 항목을 구분하기 위해 설정해야 하는 속성은?', answer: 'key' },
    { question: 'React 애플리케이션을 실제 DOM에 렌더링할 때 호출하는 함수는?', answer: 'render' },
    { question: '제어되지 않는 폼 입력(uncontrolled component)을 다룰 때 사용하는 속성은?', answer: 'ref' },
    { question: '비용이 큰 계산을 메모이제이션하기 위해 사용하는 Hook은?', answer: 'useMemo' },
    { question: '함수를 메모이제이션하여 불필요한 재생성을 방지하는 Hook은?', answer: 'useCallback' },
    { question: 'Context API를 통해 전역 데이터를 공유하기 위해 사용하는 Hook은?', answer: 'useContext' },
    { question: '모듈을 기본 내보내기할 때 사용하는 키워드는?', answer: 'default' },
    { question: '클래스형 컴포넌트에서 상태를 업데이트하기 위해 호출하는 메서드는?', answer: 'setState' },
    { question: 'React 컴포넌트 이름은 어떤 규칙으로 시작해야 하는가?', answer: '대문자' },
    { question: 'React 프로젝트를 생성 및 설치할 때 사용하는 패키지 관리 도구는?', answer: 'npm' },
    { question: 'CRA(create-react-app)로 새 앱을 초기화할 때 쓰는 명령어는?', answer: 'create-react-app' },
    { question: '타입 안전성을 위해 React에서 자주 사용하는 언어는?', answer: 'TypeScript' },
    { question: 'React 성능을 모니터링하고 디버깅하기 위해 사용하는 브라우저 확장 도구는?', answer: 'React DevTools' },
    { question: '컴포넌트 테스트를 위해 주로 사용하는 테스팅 프레임워크는?', answer: 'Jest' },
    { question: '여러 단계의 자식 컴포넌트에 props를 계속 전달해야 할 때 발생하는 문제를 지칭하는 용어는?', answer: 'props drilling' },
    { question: 'React 애플리케이션에서 기본적으로 사용하는 프로그래밍 언어는?', answer: 'JavaScript' }
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
      { question: '백엔드에서 데이터베이스 연결을 가진 도구는?', answer: 'ORM' },
      { question: 'Node.js에서 패키지를 관리하는 기본 도구는?', answer: 'npm' },
      { question: 'HTTP 상태 코드 500은 무엇을 의미하나?', answer: '서버 오류' },
      { question: '백엔드에서 API 문서를 생성하는 도구는?', answer: 'Swagger' },
    ],
  },
  인공지능: {
    boss: { name: 'AI 오라클', image: '/assets/ai_boss.jpg' },
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
  const { boss, quizzes } = themeData[theme] || { boss: { name: 'Unknown', image: '' }, quizzes: [] };
  const [shuffledQuizzes, setShuffledQuizzes] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [evaluation, setEvaluation] = useState<'Excellent' | 'Great' | 'Good' | 'Bad' | null>(null);
  const [bossHealth, setBossHealth] = useState<number>(100);
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const normalize = (str: string) =>
    str.trim().replace(/[-\s]/g, '').toLowerCase();

  const shuffleArray = (array: Quiz[]): Quiz[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (quizzes.length > 0) {
      const shuffled = shuffleArray(quizzes);
      setShuffledQuizzes(shuffled);
      setCurrentQuizIndex(0);
      setSecondsLeft(10);
      setBossHealth(100);
    }
  }, [quizzes]);

  useEffect(() => {
    setSecondsLeft(10);
    setEvaluation(null);
    setIsCorrect(null);
    setUserAnswer('');

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          if (!isSubmitting) {
            setIsSubmitting(true);
            setIsCorrect(false);
            setEvaluation('Bad');

            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }

            timerRef.current = setTimeout(() => {
              const nextIndex = currentQuizIndex + 1;
              console.log("nextIndex길이", nextIndex , "쩐체질문길이", shuffledQuizzes.length);
              if (nextIndex < shuffledQuizzes.length) {
                setCurrentQuizIndex(nextIndex);
              } else {
                alert('질문 모두 소진했습니다.');
              }
              setUserAnswer('');
              setIsCorrect(null);
              setEvaluation(null);
              setIsSubmitting(false);
            }, 3000);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentQuizIndex]);

  const handleSubmit = () => {
    if (isSubmitting || !shuffledQuizzes[currentQuizIndex]) return;

    setIsSubmitting(true);
    const correctAnswer = shuffledQuizzes[currentQuizIndex].answer;
    const isAnswerCorrect = normalize(userAnswer) === normalize(correctAnswer);
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      const elapsedTime = 10 - secondsLeft;
      let damage = 0;
      if (elapsedTime <= 2) {
        setEvaluation('Excellent');
        damage=15;
      } else if (elapsedTime <= 5) {
        setEvaluation('Great');
        damage=10;
      } else if (elapsedTime <= 10) {
        setEvaluation('Good');
        damage=5;
      }

      setBossHealth(prev => {
        const newHealth = Math.max(0, prev - damage);
        if (newHealth === 0) {
          alert('보스를 물리쳤습니다! 게임 종료!');
        }
        return newHealth;
      });
    } else {
      setEvaluation(null);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const nextIndex = currentQuizIndex + 1;
      if (nextIndex < shuffledQuizzes.length && bossHealth > 0) {
        setCurrentQuizIndex(nextIndex);
      } else if (bossHealth > 0) {
        alert('질문 모두 소진했습니다.');
      }
      setUserAnswer('');
      setIsCorrect(null);
      setEvaluation(null);
      setIsSubmitting(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentQuiz = shuffledQuizzes[currentQuizIndex];

  return (
    <S.BackGroundDiv>
      <G.Content>
        <div style={{ position: 'relative' }}>
          <G.HealthBar health={bossHealth} />
          <G.BossImage src={boss.image} alt={boss.name} />
        </div>
        <G.Question>
          {currentQuiz ? currentQuiz.question : '질문이 없습니다.'}
          <G.Timer>{secondsLeft}</G.Timer>
        </G.Question>
        <G.AnswerInput
          type="text"
          value={userAnswer}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserAnswer(e.target.value)}
          placeholder="답변을 입력하세요"
          disabled={isSubmitting}
        />
        <G.SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          제출
        </G.SubmitButton>
        {isCorrect !== null && (
          <G.ResultMessage isCorrect={isCorrect}>
            {isCorrect ? '정답입니다!' : '오답입니다.'}
          </G.ResultMessage>
        )}
        {evaluation && (
          <G.EvaluationMessage evaluation={evaluation}>
            {evaluation}
          </G.EvaluationMessage>
        )}
      </G.Content>
    </S.BackGroundDiv>
  );
};

export default GameDuring;
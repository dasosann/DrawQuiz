// src/pages/GameDuring.tsx
import React, { useState, useEffect, useRef } from 'react';
import S from '../styles/StartGame'; // 경로 수정
import G from '../styles/GameDuring';

interface GameDuringProps {
  theme: string;
  onExit: () => void;  // ← 추가
}

interface Quiz {
  question: string;
  answer: string;
}

const themeData: Record<string, { boss: { name: string; image: string }; quizzes: Quiz[] }> = {
  프론트엔드: {
    boss: { name: 'React 마스터', image: '/assets/gameItems/frontend_boss.png' },
    quizzes: [
      { question: 'React 함수형 컴포넌트에서 상태를 관리하기 위해 사용하는 Hook은 무엇인가요?', answer: 'useState' },
      { question: '컴포넌트가 마운트되거나 업데이트될 때 부수 효과를 처리하기 위해 사용하는 Hook은 무엇인가요?', answer: 'useEffect' },
      { question: 'JSX는 무엇의 약자로, 어떤 용도로 사용되나요?', answer: 'JavaScript XML' },
      { question: 'React에서 Virtual DOM이 하는 역할은 무엇인가요?', answer: '효율적인 UI 업데이트' },
      { question: '컴포넌트 간에 데이터를 전달할 때 사용하는 속성은 무엇인가요?', answer: 'props' },
      { question: 'DOM 요소를 직접 참조하기 위해 React에서 제공하는 Hook은 무엇인가요?', answer: 'useRef' },
      { question: '값을 메모이제이션하기 위해 사용하는 Hook은 무엇인가요?', answer: 'useMemo' },
      { question: '함수를 메모이제이션하기 위해 사용하는 Hook은 무엇인가요?', answer: 'useCallback' },
      { question: '전역 상태 관리를 위해 Context API와 함께 사용하는 Hook은 무엇인가요?', answer: 'useContext' },
      { question: '컴포넌트 트리를 벗어나 별도로 렌더링하기 위해 사용하는 React 메서드는 무엇인가요?', answer: 'createPortal' },
      { question: '렌더링 중 레이아웃 측정 등 부수 효과를 처리하는 Hook은 무엇인가요?', answer: 'useLayoutEffect' },
      { question: '리듀서 패턴을 사용하여 상태를 업데이트하기 위해 사용하는 Hook은 무엇인가요?', answer: 'useReducer' },
      { question: 'React 애플리케이션의 최상위 진입점에서 호출하는 렌더링 메서드는 무엇인가요?', answer: 'ReactDOM.render' },
      { question: '랜더링되지 않는 자식 요소를 그룹화하기 위해 사용하는 빈 태그의 이름은 무엇인가요?', answer: 'Fragment' },
      { question: '컴포넌트 수준에서 엄격 모드를 활성화하기 위해 사용하는 컴포넌트 이름은 무엇인가요?', answer: 'StrictMode' },
      { question: '클라이언트 사이드 라우팅을 지원하기 위해 주로 사용하는 라이브러리는 무엇인가요?', answer: 'react-router' },
      { question: '컴포넌트 성능을 최적화하기 위해 사용하는 고차 컴포넌트는 무엇인가요?', answer: 'memo' },
      { question: '함수형 컴포넌트에도 ref를 전달하기 위해 사용하는 고차 컴포넌트는 무엇인가요?', answer: 'forwardRef' },
      { question: 'React에서 동적 import와 함께 사용하는 함수는 무엇인가요?', answer: 'lazy' },
      { question: 'lazy로 로드되는 컴포넌트를 로딩 중 표시하기 위해 사용하는 컴포넌트는 무엇인가요?', answer: 'Suspense' },
      { question: 'React DevTools는 어떤 용도로 사용되나요?', answer: '디버깅 및 성능 분석' },
      { question: '컴포넌트에 스타일을 정의하기 위해 styled-components에서 사용하는 함수는 무엇인가요?', answer: 'styled' },
      { question: 'Recoil이나 Zustand와 같이 전역 상태 관리를 대체하기 위해 사용할 수 있는 라이브러리 이름을 하나 말해주세요.', answer: 'Recoil' },
      { question: 'TypeScript와 함께 React를 사용했을 때 주로 사용하는 파일 확장자는 무엇인가요?', answer: '.tsx' },
      { question: '단위 테스트를 위해 React 컴포넌트를 렌더링하고 상호작용하는 라이브러리는 무엇인가요?', answer: 'React Testing Library' },
      { question: '컴포넌트 내부 상태 변경을 비동기적으로 처리하기 위해 사용할 수 있는 Hook은 무엇인가요?', answer: 'useTransition' },
      { question: 'React의 새로운 렌더러 압축 기능은 무엇이라고 하나요?', answer: 'Concurrent Mode' },
      { question: '서버 사이드 렌더링을 위해 Next.js가 제공하는 메서드는 무엇인가요?', answer: 'getServerSideProps' },
      { question: '정적 사이트 생성을 위해 Next.js에서 사용하는 메서드는 무엇인가요?', answer: 'getStaticProps' },
      { question: 'React 애플리케이션 번들 분석을 위해 사용할 수 있는 도구 이름을 하나 말해주세요.', answer: 'webpack-bundle-analyzer' },
    ],
  },
  백엔드: {
    boss: { name: 'Node.js 거인', image: '/assets/gameItems/backend_boss.png' },
    quizzes: [
      { question: 'REST API에서 CRUD의 C는 무엇을 의미하나요?', answer: 'Create' },
      { question: 'Express.js 애플리케이션을 시작하기 위해 호출하는 메서드는 무엇인가요?', answer: 'app.listen' },
      { question: 'HTTP 요청 본문을 JSON으로 파싱하기 위해 사용하는 미들웨어는 무엇인가요?', answer: 'express.json' },
      { question: '라우터 모듈을 생성하기 위해 사용하는 Express 함수는 무엇인가요?', answer: 'express.Router' },
      { question: 'Node.js에서 파일 시스템 작업을 위해 가져오는 모듈 이름은 무엇인가요?', answer: 'fs' },
      { question: 'Node.js 애플리케이션에서 환경 변수를 관리하기 위해 사용하는 패키지는 무엇인가요?', answer: 'dotenv' },
      { question: '비동기 오류 처리를 도와주는 라이브러리 이름을 말해주세요.', answer: 'express-async-errors' },
      { question: 'CORS 이슈를 해결하기 위해 사용하는 미들웨어는 무엇인가요?', answer: 'cors' },
      { question: 'REST API에서 자원을 식별하기 위해 사용하는 식별자는 무엇인가요?', answer: 'URI' },
      { question: 'HTTP 응답 상태 코드를 보내기 위해 사용하는 Express 응답 메서드는 무엇인가요?', answer: 'res.status' },
      { question: 'JWT 토큰을 생성하고 검증하기 위해 사용하는 패키지는 무엇인가요?', answer: 'jsonwebtoken' },
      { question: '비밀번호 해싱을 위해 사용하는 라이브러리 이름은 무엇인가요?', answer: 'bcrypt' },
      { question: '세션 기반 인증을 위해 사용할 수 있는 미들웨어는 무엇인가요?', answer: 'express-session' },
      { question: 'MySQL과 같은 관계형 데이터베이스와 통신하기 위해 사용하는 패키지는 무엇인가요?', answer: 'mysql2' },
      { question: 'NoSQL 데이터베이스 중 문서(document) 형식을 사용하는 데이터베이스 이름은 무엇인가요?', answer: 'MongoDB' },
      { question: 'ORM을 사용해 모델을 정의하고 쿼리하기 위해 사용하는 라이브러리 이름은 무엇인가요?', answer: 'Sequelize' },
      { question: 'API 문서를 자동 생성하기 위해 사용하는 도구는 무엇인가요?', answer: 'Swagger' },
      { question: 'GraphQL 서버를 구성하기 위해 사용하는 라이브러리 이름은 무엇인가요?', answer: 'Apollo Server' },
      { question: 'Redis를 캐시 또는 세션 스토어로 사용하기 위해 사용하는 패키지는 무엇인가요?', answer: 'ioredis' },
      { question: 'Node.js에서 HTTP 서버를 직접 생성할 때 사용하는 내장 모듈 이름은 무엇인가요?', answer: 'http' },
      { question: 'Node.js 비동기 코드를 작성할 때 사용하는 ES2017 키워드는 무엇인가요?', answer: 'async/await' },
      { question: '테스트 주도 개발(TDD)에 자주 사용되는 테스팅 프레임워크 이름은 무엇인가요?', answer: 'Jest' },
      { question: '모든 요청을 기록하기 위해 사용하는 로깅 라이브러리 이름은 무엇인가요?', answer: 'winston' },
      { question: '애플리케이션의 구성을 분리하여 관리하기 위해 사용하는 패턴 또는 라이브러리는 무엇인가요?', answer: 'config' },
      { question: 'Node.js 서버를 무중단 재시작하기 위해 사용하는 프로세스 관리자 이름은 무엇인가요?', answer: 'PM2' },
      { question: 'HTTP 클라이언트 요청을 보내기 위해 사용하는 npm 라이브러리 이름은 무엇인가요?', answer: 'axios' },
      { question: '서버 사이드 렌더링을 위해 Next.js API 라우트를 사용할 때 파일 확장자는 무엇인가요?', answer: '.ts' },
      { question: 'TypeScript로 Node.js를 작성할 때 컴파일러 옵션 파일 이름은 무엇인가요?', answer: 'tsconfig.json' },
      { question: 'HTTP/2 서버를 생성하기 위해 사용하는 Node.js 내장 모듈 이름은 무엇인가요?', answer: 'http2' },
    ],
  },
  인공지능: {
    boss: { name: 'AI 오라클', image: '/assets/ai_boss.jpg' },
    quizzes: [
      { question: '인공 신경망의 기본 단위는 무엇인가요?', answer: '뉴런' },
      { question: '경사 하강법이 최적화하는 대상은 무엇인가요?', answer: '손실 함수' },
      { question: '과적합을 방지하기 위한 기법 중 하나는 무엇인가요?', answer: '정규화' },
      { question: '이미지 처리에 흔히 사용하는 신경망 구조는 무엇인가요?', answer: 'CNN' },
      { question: '시퀀스 데이터를 다룰 때 사용하는 신경망 구조는 무엇인가요?', answer: 'RNN' },
      { question: 'Transformer 모델이 사용하는 핵심 메커니즘은 무엇인가요?', answer: '어텐션' },
      { question: '단어를 벡터로 변환하는 기술 예시는 무엇인가요?', answer: 'Word2Vec' },
      { question: '언어 모델 학습에 사용되는 오픈AI 모델 이름 중 하나는 무엇인가요?', answer: 'GPT' },
      { question: '생성적 적대 신경망의 약자는 무엇인가요?', answer: 'GAN' },
      { question: '강화 학습의 기본 요소 중 하나인 환경(environment)과 상호작용하는 주체를 무엇이라 하나요?', answer: '에이전트' },
      { question: '머신러닝 평가 지표 중 분류 정확도를 나타내는 용어는 무엇인가요?', answer: 'Accuracy' },
      { question: '손실 함수를 최소화하기 위해 사용하는 최적화 알고리즘 예시는 무엇인가요?', answer: 'Adam' },
      { question: '딥러닝 프레임워크 중 하나로 구글에서 개발한 것은 무엇인가요?', answer: 'TensorFlow' },
      { question: '딥러닝 프레임워크 중 페이스북에서 개발한 것은 무엇인가요?', answer: 'PyTorch' },
      { question: '머신러닝에서 과적합을 줄이기 위해 사용하는 앙상블 기법 예시는 무엇인가요?', answer: 'Random Forest' },
      { question: '비지도 학습의 대표적인 클러스터링 알고리즘은 무엇인가요?', answer: 'K-means' },
      { question: '차원 축소 기법 중 하나인 주성분 분석의 약자는 무엇인가요?', answer: 'PCA' },
      { question: '자연어 처리 라이브러리 중 하나인 NLTK는 무엇의 약자인가요?', answer: 'Natural Language Toolkit' },
      { question: '시퀀스 토큰화를 위한 도구 예시는 무엇인가요?', answer: 'Tokenizer' },
    ]
},
};

const GameDuring: React.FC<GameDuringProps> = ({ theme, onExit }) => {
  const { boss, quizzes } = themeData[theme] || { boss: { name: 'Unknown', image: '' }, quizzes: [] };
  const [shuffledQuizzes, setShuffledQuizzes] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [evaluation, setEvaluation] = useState<'Excellent' | 'Great' | 'Good' | 'Bad' | null>(null);
  const [bossHealth, setBossHealth] = useState<number>(100);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const normalize = (str: string) => str.trim().replace(/[-\s]/g, '').toLowerCase();

  // 퀴즈 섞기 및 초기 세팅
  useEffect(() => {
  if (!shuffledQuizzes.length) return;   // 퀴즈가 준비되지 않았다면 무시
  setSecondsLeft(10);                    // 매 문제마다 10초로 초기화
  clearInterval(intervalRef.current!);
  clearTimeout(timerRef.current!);
  resumeTimer();                         //남은 시간(=10초)부터 countdown 시작
}, [currentQuizIndex, shuffledQuizzes.length]);

  // 실제 카운트다운 로직 (현재 secondsLeft 유지)
  const resumeTimer = () => {
    clearInterval(intervalRef.current!);
    clearTimeout(timerRef.current!);
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsSubmitting(true);
          setIsCorrect(false);
          setEvaluation('Bad');
          timerRef.current = window.setTimeout(() => {
            const next = currentQuizIndex + 1;
            if (next < shuffledQuizzes.length) setCurrentQuizIndex(next);
            else alert('질문 모두 소진했습니다.');
          }, 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 문제 전환 시 startCountdown 호출
    useEffect(() => {
    window.history.pushState(null, '', '');
    const handlePop = () => {
      clearInterval(intervalRef.current!);
      clearTimeout(timerRef.current!);
      setShowExitModal(true);
      window.history.pushState(null, '', '');
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const handleCancel = () => {
    setShowExitModal(false);
    resumeTimer(); // 남은 시간 그대로 재개
  };

   const handleConfirm = () => {
    setShowExitModal(false);
    onExit();  // ← 이 콜백으로 App의 화면 전환을 트리거
  };

  // 답안 제출
  const handleSubmit = () => {
    if (isSubmitting) return;
    clearInterval(intervalRef.current!);
    clearTimeout(timerRef.current!);
    setIsSubmitting(true);

    const ok = normalize(userAnswer) === normalize(shuffledQuizzes[currentQuizIndex].answer);
    setIsCorrect(ok);
    if (ok) {
      const elapsed = 10 - secondsLeft;
      const dmg = elapsed <= 2 ? 15 : elapsed <= 5 ? 10 : 5;
      setEvaluation(elapsed <= 2 ? 'Excellent' : elapsed <= 5 ? 'Great' : 'Good');
      setBossHealth(prev => Math.max(0, prev - dmg));
    }

    timerRef.current = window.setTimeout(() => {
      const next = currentQuizIndex + 1;
      if (next < shuffledQuizzes.length && bossHealth > 0) setCurrentQuizIndex(next);
      else if (bossHealth > 0) alert('보스 공략 실패');
    }, 3000);
  };

  // 언마운트 시 정리
  useEffect(() => () => {
    clearInterval(intervalRef.current!);
    clearTimeout(timerRef.current!);
  }, []);

  const currentQuiz = shuffledQuizzes[currentQuizIndex];

  return (
    <>
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
            onChange={e => setUserAnswer(e.target.value)}
            placeholder="답변을 입력하세요"
            disabled={isSubmitting}
          />
          <G.SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
            제출
          </G.SubmitButton>
          {isCorrect != null && (
            <G.ResultMessage isCorrect={isCorrect}>
              {isCorrect ? '정답입니다!' : '오답입니다.'}
            </G.ResultMessage>
          )}
          {evaluation && <G.EvaluationMessage evaluation={evaluation}>{evaluation}</G.EvaluationMessage>}
        </G.Content>
      </S.BackGroundDiv>
      {showExitModal && (
        <G.ModalOverlay>
          <G.ModalContainer>
            <p>정말로 메인화면으로 나가시겠습니까?</p>
            <G.ModalButton className="cancel" onClick={handleCancel}>취소</G.ModalButton>
            <G.ModalButton className="confirm" onClick={handleConfirm}>확인</G.ModalButton>
          </G.ModalContainer>
        </G.ModalOverlay>
      )}
    </>
  );
};

export default GameDuring;

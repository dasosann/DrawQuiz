// src/styles/GameDuring.ts
import styled from 'styled-components';

interface ResultMessageProps {
  isCorrect: boolean;
  children: React.ReactNode; // 자식 콘텐츠를 위한 prop
}
interface EvaluationMessageProps {
  evaluation: 'Excellent' | 'Great' | 'Good' | 'Bad';
  children: React.ReactNode; // 자식 콘텐츠 추가
}
interface HealthBarProps {
  health: number; // 체력 비율 (0~100)
}

interface StyledComponents {
  Content: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
  BossImage: React.ComponentType<React.ImgHTMLAttributes<HTMLImageElement>>;
  BossName: React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>;
  Question: React.ComponentType<React.HTMLAttributes<HTMLParagraphElement>>;
  AnswerInput: React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;
  SubmitButton: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  ResultMessage: React.ComponentType<ResultMessageProps>;
  EvaluationMessage :React.ComponentType<EvaluationMessageProps>;
  HealthBar: React.ComponentType<HealthBarProps>;
  Timer: React.ComponentType<React.HTMLAttributes<HTMLSpanElement>>;
}

const G: StyledComponents = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    //justify-content: center;
    height: 100%;
    color: #ffffff;
    text-align: center;
  `,

  BossImage: styled.img`
    width: clamp(150px, 40vw, 200px);
    height: auto;
    margin-bottom: 20px;
  `,

  BossName: styled.h2`
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: 700;
    margin: 0 0 20px;
  `,

  Question: styled.p`
    font-size: clamp(1rem, 3.5vw, 1.2rem);
    margin: 10px 0;
  `,

  AnswerInput: styled.input`
    padding: 10px;
    font-size: clamp(0.875rem, 3vw, 1rem);
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    width: clamp(200px, 60vw, 300px);
  `,

  SubmitButton: styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    font-family: var(--font-family-base);
    font-size: clamp(0.875rem, 3vw, 1rem);
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background-color: #0056b3;
    }
  `,

  ResultMessage: styled.p<ResultMessageProps>`
    font-size: clamp(1rem, 3.5vw, 1.2rem);
    color: ${props => (props.isCorrect ? '#28a745' : '#dc3545')};
    margin: 10px 0;
  `,
  EvaluationMessage: styled.p<EvaluationMessageProps>`
    font-size: clamp(1rem, 3.5vw, 1.2rem);
    color: ${props =>
      props.evaluation === 'Excellent'
        ? '#ffd700'
        : props.evaluation === 'Great'
        ? '#40c4ff'
        : props.evaluation === 'Good'
        ? '#ff9800'
        : '#666666'};
    margin: 10px 0;
  `,
  HealthBar: styled.div<HealthBarProps>`
    /* position: absolute;
    top: -20px; */
    width: clamp(150px, 40vw, 200px);
    height: 10px;
    background-color: #ccc;
    border-radius: 5px;
    overflow: hidden;

    &::before {
      content: '';
      display: block;
      width: ${props => props.health}%;
      height: 100%;
      background-color:rgb(218, 10, 10);
      transition: width 0.3s ease;
    }
  `,
  Timer: styled.span`
    font-size: clamp(1rem, 3.5vw, 1.2rem);
    color: #ff4444;
    margin-left: 10px;
  `,
};

export default G;
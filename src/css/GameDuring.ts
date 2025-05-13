// src/styles/GameDuring.ts
import styled from 'styled-components';

interface ResultMessageProps {
  isCorrect: boolean;
  children: React.ReactNode; // 자식 콘텐츠를 위한 prop
}

interface StyledComponents {
  Content: React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;
  BossImage: React.ComponentType<React.ImgHTMLAttributes<HTMLImageElement>>;
  BossName: React.ComponentType<React.HTMLAttributes<HTMLHeadingElement>>;
  Question: React.ComponentType<React.HTMLAttributes<HTMLParagraphElement>>;
  AnswerInput: React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;
  SubmitButton: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  ResultMessage: React.ComponentType<ResultMessageProps>;
}

const G: StyledComponents = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #ffffff;
    text-align: center;
    font-family: var(--font-family-base);
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
};

export default G;
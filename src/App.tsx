import React, { useState } from 'react';
import StartGame from './pages/StartGame';
import GameDuring from './pages/GameDuring';
import './App.css';

const App: React.FC = () => {
  const [screen, setScreen] = useState<'start' | 'game' | 'result'>('start');
  const [theme, setTheme] = useState<string>('');

  // StartGame에서 테마 선택 및 화면 전환 처리
  const handleThemeSelect = (selectedTheme: string) => {
    setTheme(selectedTheme);
    setScreen('game');
  };

  return (
    <div>
      {screen === 'start' && <StartGame onThemeSelect={handleThemeSelect} />}
      {screen === 'game' && <GameDuring theme={theme} onExit={()=>setScreen('start')} />}
    </div>
  );
};

export default App;
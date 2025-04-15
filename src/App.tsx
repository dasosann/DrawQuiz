  // src/App.tsx
  import React, { useState } from 'react';
  import StartGame from './pages/StartGame';
  import './App.css';

  const App: React.FC = () => {
    const [screen, setScreen] = useState<'start' | 'game' | 'result'>('start');
    

    return (
      <div>
        {screen === 'start' && <StartGame/>}
      </div>
    );
  };

  export default App;
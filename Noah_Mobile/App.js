
import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('Login');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Login':
        return <LoginPage />;
      // Add more cases/screens if needed
      case 'Home':
        return <HomePage />;
      default:
        return <LoginPage />;
    }
  };

  return renderScreen();
};

export default App;

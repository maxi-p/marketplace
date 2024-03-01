import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import CardPage from './pages/CardPage';
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage/>}/>
        <Route path="/cards" index element={<CardPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

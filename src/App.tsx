import { MemoryRouter, Routes, Route } from 'react-router';

import './App.css';

import { SignInPage } from './screens/auth/SignInPage.js';
import { SignUpPage } from './screens/auth/SignUpPage.js';
import { MainPage } from './screens/main/MainPage.js';

export function App() {
  return (
    <view className="main-container">
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </MemoryRouter>
    </view>
  );
}

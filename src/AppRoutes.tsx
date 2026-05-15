import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';
import ResetPassword from './pages/ResetPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;

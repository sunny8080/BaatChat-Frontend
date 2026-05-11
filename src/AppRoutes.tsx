import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default AppRoutes;

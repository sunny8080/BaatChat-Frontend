import './App.css';
import './global.scss';
import AppRoutes from './AppRoutes';
import CookieBanner from './components/CookieBanner/CookieBanner';
import { useState } from 'react';
import { getCookiesPref } from './utils/utils';

function App() {
  // we have to show cookies consent banner, if it is not provided or it was auto dismissed
  const cookiesPrefs = getCookiesPref();
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(!cookiesPrefs);

  return (
    <div className="w-screen min-h-screen">
      <AppRoutes setShowCookieBanner={setShowCookieBanner} />

      {showCookieBanner && <CookieBanner setShowCookieBanner={setShowCookieBanner} />}
    </div>
  );
}

export default App;

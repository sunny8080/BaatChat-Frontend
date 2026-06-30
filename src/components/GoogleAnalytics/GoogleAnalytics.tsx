import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();

  // since google analytics can't track internal page navigation, so we have to manually send analytics to google analytics
  useEffect(() => {
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
    });
  }, [location]);
  return null;
};

export default GoogleAnalytics;

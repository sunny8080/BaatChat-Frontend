import { Cookie, SlidersHorizontal } from 'lucide-react';
import './CookieBanner.scss';
import { useEffect, useState } from 'react';
import type { CookiesSetting } from '../../utils/constant';
import Modal from '../Modal/Modal';
import CookiesSettings from '../CookiesSettings/CookiesSettings';
import { setCookie } from '../../utils/utils';

type Props = {
  setShowCookieBanner: React.Dispatch<React.SetStateAction<boolean>>;
};

const CookieBanner = ({ setShowCookieBanner }: Props) => {
  const [isClosing, setIsClosing] = useState(false);
  const [showCookiesSettings, setShowCookiesSettings] = useState(false);

  const setCookiePrefs = ({
    essential,
    functional,
    analytics,
    isDismissed,
    options = {},
  }: {
    essential: boolean;
    functional: boolean;
    analytics: boolean;
    isDismissed?: boolean;
    options?: any;
  }) => {
    const cookiesPrefs: CookiesSetting = {
      essential,
      functional,
      analytics,
      isDismissed,
      providedAt: new Date(),
    };
    setCookie('cookiesPrefs', JSON.stringify(cookiesPrefs), options);
    setIsClosing(true);
  };

  const acceptAllCookies = () => {
    setCookiePrefs({ essential: true, functional: true, analytics: true });
  };

  const acceptEssentialOnlyCookies = () => {
    setCookiePrefs({ essential: true, functional: false, analytics: false });
  };

  const acceptCustomCookiesPref = (essential: boolean, functional: boolean, analytics: boolean) => {
    setCookiePrefs({ essential, functional, analytics });
  };

  const handleAnimationEnd = () => {
    if (isClosing) setShowCookieBanner(false);
  };

  useEffect(() => {
    // hide cookies banner after 15sec, set pref as essential only for 12 hours
    const timeout = setTimeout(() => {
      if (isClosing) {
        return;
      }
      // setCookiePrefs({
      //   essential: true,
      //   functional: false,
      //   analytics: false,
      //   isDismissed: true,
      //   options: { maxAge: 12 * 60 * 60 },
      // });
    }, 15000);
    return () => clearTimeout(timeout);
  }, [isClosing]);

  return (
    <div
      className={`bc-CookieBanner ${isClosing ? 'closing' : ''}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="bc-cb-left">
        <div className="banner-icon">
          <Cookie />
        </div>
        <div className="banner-txt">
          <h3>We use minimal cookies by the way</h3>
          <p>
            We use essential cookies to keep you signed in and secure. We may also use optional
            cookies to improve your experience. Read our <a href="/cookies-policy">Cookie Policy</a>{' '}
            and <a href="/privacy-policy">Privacy Policy</a>.
          </p>
        </div>
      </div>
      <div className="bc-cb-ctas">
        <button
          className="bc-btn bc-btn-secondary rect"
          onClick={() => setShowCookiesSettings(true)}
        >
          <span>
            <SlidersHorizontal size={15} />
          </span>
          Cookies Settings
        </button>
        <button className="bc-btn bc-btn-primary rect" onClick={acceptAllCookies}>
          Accept all
        </button>
      </div>

      {showCookiesSettings && (
        <Modal
          handleOverlayClick={() => setShowCookiesSettings(false)}
          modalContentStyles={{ width: '100%', maxWidth: '640px' }}
        >
          <CookiesSettings
            setShowCookiesSettings={setShowCookiesSettings}
            acceptAllCookies={acceptAllCookies}
            acceptEssentialOnlyCookies={acceptEssentialOnlyCookies}
            acceptCustomCookiesPref={acceptCustomCookiesPref}
          />
        </Modal>
      )}
    </div>
  );
};

export default CookieBanner;

import { ChevronDown, Cog, Cookie, FileChartColumnIncreasing, Info, Lock, X } from 'lucide-react';
import './CookiesSettings.scss';
import { useState } from 'react';

type Props = {
  setShowCookiesSettings: React.Dispatch<React.SetStateAction<boolean>>;
  acceptAllCookies: () => void;
  acceptEssentialOnlyCookies: () => void;
  acceptCustomCookiesPref: (essential: boolean, functional: boolean, analytics: boolean) => void;
};

const CookiesSettings = ({
  setShowCookiesSettings,
  acceptAllCookies,
  acceptEssentialOnlyCookies,
  acceptCustomCookiesPref,
}: Props) => {
  const [openTabs, setOpenTabs] = useState(new Set());
  const [selectedCookie, setSelectedCookie] = useState(new Set());

  const toggleTab = (tabId: string) => {
    setOpenTabs((prev) => {
      const updatedOpenTabs = new Set(prev);
      if (updatedOpenTabs.has(tabId)) updatedOpenTabs.delete(tabId);
      else updatedOpenTabs.add(tabId);
      return updatedOpenTabs;
    });
  };

  const toggleCookieSelection = (cookie: string) => {
    setSelectedCookie((prev) => {
      const updatedSelectedCookie = new Set(prev);
      if (updatedSelectedCookie.has(cookie)) updatedSelectedCookie.delete(cookie);
      else updatedSelectedCookie.add(cookie);
      return updatedSelectedCookie;
    });
  };

  const handleSavePref = () => {
    acceptCustomCookiesPref(
      true,
      selectedCookie.has('functional'),
      selectedCookie.has('analytics'),
    );
    setShowCookiesSettings(false);
  };

  return (
    <div className="bc-CookiesSettings">
      <div className="bc-cookies-settings-orb"></div>
      <div className="bc-cookies-settings-header">
        <div className="bc-cs-left">
          <div className="bc-cs-icon">
            <Cookie size={20} />
          </div>

          <div>
            <div className="bc-cs-header-title">
              Cookies <span>Settings</span>
            </div>
            <p className="bc-cs-header-sub">
              Manage which cookies BaatChat can use on your device.
            </p>
          </div>
        </div>

        <button className="bc-cs-close-btn" onClick={() => setShowCookiesSettings(false)}>
          <X size={22} />
        </button>
      </div>

      <div className="bc-cookies-settings-quick-ctas">
        <span className="quick-label">Quick select:</span>
        <button
          className="bc-btn rect bc-btn-primary quick-btn"
          onClick={() => {
            acceptAllCookies();
            setShowCookiesSettings(false);
          }}
        >
          Accept All
        </button>
        <button
          className="bc-btn rect bc-btn-secondary quick-btn"
          onClick={() => {
            acceptEssentialOnlyCookies();
            setShowCookiesSettings(false);
          }}
        >
          Essential only{' '}
        </button>
      </div>

      <div className="bc-cookies-settings-body">
        <div className="bc-cs-policy-link-box">
          <Info />
          <div className="bc-cs-policy-link-box-text">
            Learn how we use cookies in our <a href="/cookies-policy">Cookie Policy</a>,{' '}
            <a href="/privacy-policy">Privacy Policy</a>, and{' '}
            <a href="/terms-of-service">Terms of Service</a>. Last updated{' '}
            <strong>June 21, 2026</strong>.
          </div>
        </div>

        <div
          className={`bc-cs-cat-wrapper ${openTabs.has('essential') ? 'expanded' : ''}`}
          id="essential"
          onClick={() => toggleTab('essential')}
        >
          <div className="bc-cs-cat-header">
            <div className="cookie-left">
              <span className="cookie-icon grn">
                <Lock />
              </span>
              <span className="cookie-title">
                Essential Cookies <span className="cookie-badge grn">Always On</span>
              </span>
            </div>

            <div className="cookie-right">
              <button
                className="cookie-toggle-btn on required"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                aria-label="Essential cookies (always on)"
              ></button>
              <div className="cookie-expand-btn">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="bc-cs-cat-desc">
            <div className="desc-txt">
              These cookies are necessary for the website to function properly. They help keep you
              signed in, secure your account, remember your cookie preferences, and enable core
              features such as authentication and security. These cookies do not store any
              personally identifiable information. Some third-party services, such as Google
              Sign-In, may also use essential cookies required for authentication and security.
            </div>
          </div>
        </div>

        <div
          className={`bc-cs-cat-wrapper ${openTabs.has('functional') ? 'expanded' : ''}`}
          id="functional"
          onClick={() => toggleTab('functional')}
        >
          <div className="bc-cs-cat-header">
            <div className="cookie-left">
              <span className="cookie-icon vlt">
                <Cog />
              </span>
              <span className="cookie-title">
                Functional Cookies <span className="cookie-badge vlt">Optional</span>
              </span>
            </div>

            <div className="cookie-right">
              <button
                className={`cookie-toggle-btn ${selectedCookie.has('functional') ? 'on' : 'off'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCookieSelection('functional');
                }}
                aria-label="Toggle functional cookies"
              ></button>
              <div className="cookie-expand-btn">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="bc-cs-cat-desc">
            <div className="desc-txt">
              These cookies remember your preferences and enhance your experience by enabling
              features such as saved settings, preferred login methods, and personalized
              functionality. Disabling these cookies may cause certain features to work less
              effectively.
            </div>
          </div>
        </div>

        <div
          className={`bc-cs-cat-wrapper ${openTabs.has('analytics') ? 'expanded' : ''}`}
          id="analytics"
          onClick={() => toggleTab('analytics')}
        >
          <div className="bc-cs-cat-header">
            <div className="cookie-left">
              <span className="cookie-icon orng">
                <FileChartColumnIncreasing />
              </span>
              <span className="cookie-title">
                Analytics Cookies <span className="cookie-badge orng">Coming soon</span>
              </span>
            </div>

            <div className="cookie-right">
              <button
                className={`cookie-toggle-btn ${selectedCookie.has('analytics') ? 'on' : 'off'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCookieSelection('analytics');
                }}
                aria-label="Toggle analytics cookies"
              ></button>
              <div className="cookie-expand-btn">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>

          <div className="bc-cs-cat-desc">
            <div className="desc-txt">
              These cookies help us understand how visitors use our website by collecting
              information such as page visits, feature usage, and performance metrics. The
              information is used to improve the Service and provide a better user experience. We do
              not currently use analytics cookies. This setting is provided for future use.
            </div>
          </div>
        </div>
      </div>

      <div className="bc-cs-footer-ctas">
        <button
          className="bc-btn rect bc-btn-secondary"
          onClick={() => setShowCookiesSettings(false)}
        >
          Cancel
        </button>
        <button className="bc-btn rect bc-btn-primary" onClick={handleSavePref}>
          Save preferences
        </button>
      </div>
    </div>
  );
};

export default CookiesSettings;

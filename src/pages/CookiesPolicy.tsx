import {
  AlarmClock,
  ArrowUp,
  Ban,
  CalendarDays,
  Clock4,
  Cog,
  Cookie,
  FileChartColumnIncreasing,
  GitPullRequestClosed,
  Handshake,
  Info,
  KeyRound,
  Lock,
  LockKeyhole,
  Mail,
  MapPin,
  MapPinHouseIcon,
  PanelTop,
  Pointer,
  RefreshCcw,
  ShelvingUnit,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Table2,
  TriangleAlert,
} from 'lucide-react';
import Navbar from '../components/Navbar/Navbar';
import './TermsOfService.scss';
import './CookiesPolicy.scss';
import Footer from '../components/Footer/Footer';
import { useEffect, useState } from 'react';
import GoogleIcon2 from '../assets/social/google2.svg?react';
import SEOTags from '../components/SEOTags/SEOTags';

type Props = {
  setShowCookieBanner: React.Dispatch<React.SetStateAction<boolean>>;
};

const CookiesPolicy = ({ setShowCookieBanner }: Props) => {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('s1');

  useEffect(() => {
    // setup for progress bar and back to top button
    const handlePageScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
      setShowBackToTop(scrollTop > 400);
    };

    document.addEventListener('scroll', handlePageScroll);
    handlePageScroll();

    // highlight left rail link as it's section is into view
    const sections = document.querySelectorAll('section[id].bc-tos-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);

            // bring a tag element into view
            const activeLink = document.querySelector(
              `.bc-tos-toc-item a[href="#${entry.target.id}"]`,
            );
            if (activeLink) {
              activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-80px 0px -70% 0px',
      },
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      document.removeEventListener('scroll', handlePageScroll);
      observer.disconnect();
    };
  }, []);

  const handleBackToTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bc-CookiesPolicy">
      <SEOTags
        title="Cookies Policy | BaatChat"
        description="Read BaatChat's Cookies Policy to understand how cookies and similar technologies improve your browsing experience and enhance our services."
        canonicalLink={import.meta.env.VITE_FED_URL + '/cookies-policy'}
        image="cookies.png"
        pageType="default"
      />
      {/* bg orbs  */}
      <div className="bg-orb bg-orb1"></div>
      <div className="bg-orb bg-orb2"></div>
      <div className="bg-orb bg-orb3"></div>

      <div className="bc-tos-progress-bar" style={{ width: `${progress}%` }}></div>
      <div
        className={`bc-tos-back-to-top ${showBackToTop ? 'show' : ''}`}
        aria-label="Back to top"
        onClick={handleBackToTopClick}
      >
        <ArrowUp />
      </div>

      <Navbar />

      {/* HERO section */}
      <div className="bc-tos-hero">
        <div className="hero-tag">
          <Cookie />
          Legal Document
        </div>
        <h1 className="hero-title">
          Cookie <span className="grad">Policy</span>
        </h1>
        <p className="hero-sub">
          A plain-English guide to every cookie BaatChat uses — what it stores, why we need it, and
          how you can control it.
        </p>
        <div className="hero-meta">
          <div className="hero-meta-item">
            <CalendarDays />
            Effective: June 21, 2026
          </div>
          <div className="hero-meta-item">
            <Clock4 />
            Last updated: June 21, 2026
          </div>
          <div className="hero-meta-item">
            <MapPin /> Governed by Indian law
          </div>
          <div className="hero-meta-item">
            <ShieldCheck /> DPDP Act 2023 compliant
          </div>
        </div>
      </div>

      {/* COLOR LEGEND */}
      <div className="bc-legend-strip">
        <span className="legend-label">Colour key</span>

        <span className="legend-pill user-content">
          <span className="legend-dot"></span>
          <span>Essential - always on</span>
        </span>

        <span className="legend-pill identity">
          <span className="legend-dot"></span>
          <span>Functional - optional</span>
        </span>

        <span className="legend-pill usage">
          <span className="legend-dot"></span>
          <span>Analytics - coming soon</span>
        </span>
      </div>

      {/* CONTENT */}
      <div className="bc-tos-body">
        {/* Table of Contents */}
        <aside className="bc-tos-toc" aria-label="Table of contents">
          <div className="bc-tos-toc-label">On this page</div>
          <ul className="bc-tos-toc-list">
            <li className="bc-tos-toc-item active">
              <a
                href="#what-are-cookies"
                className={`${activeSectionId === 'what-are-cookies' ? 'active' : ''}`}
              >
                <Info />
                What Are Cookies?
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#cookies-at-glance"
                className={`${activeSectionId === 'cookies-at-glance' ? 'active' : ''}`}
              >
                <Table2 />
                All Cookies at a Glance
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#essential-cookies"
                className={`${activeSectionId === 'essential-cookies' ? 'active' : ''}`}
              >
                <LockKeyhole />
                Essential Cookies
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#functional-cookies"
                className={`${activeSectionId === 'functional-cookies' ? 'active' : ''}`}
              >
                <Cog />
                Functional Cookies
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#analytics-cookies"
                className={`${activeSectionId === 'analytics-cookies' ? 'active' : ''}`}
              >
                <FileChartColumnIncreasing />
                Analytics Cookies
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#your-choices"
                className={`${activeSectionId === 'your-choices' ? 'active' : ''}`}
              >
                <SlidersHorizontal />
                Your Choices
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#policy-updates"
                className={`${activeSectionId === 'policy-updates' ? 'active' : ''}`}
              >
                <RefreshCcw />
                Policy Updates
              </a>
            </li>
            <li className="bc-tos-toc-item">
              <a
                href="#contact-us"
                className={`${activeSectionId === 'contact-us' ? 'active' : ''}`}
              >
                <Mail />
                Contact Us
              </a>
            </li>
          </ul>

          <div className="bc-tos-toc-divider"></div>

          <div className="bc-tos-toc-label mb-2">Colour key</div>

          <div className="bc-toc-mini-legend">
            <div className="toc-legend-item">
              <div className="toc-legend-dot" style={{ background: 'var(--green-color)' }}></div>
              <span>Essential - always on</span>
            </div>
            <div className="toc-legend-item">
              <div className="toc-legend-dot" style={{ background: 'var(--lavender-color)' }}></div>
              <span>Functional - optional</span>
            </div>
            <div className="toc-legend-item">
              <div className="toc-legend-dot" style={{ background: 'var(--gold-color)' }}></div>
              <span>Analytics - coming soon</span>
            </div>
          </div>
          <div className="bc-tos-toc-divider"></div>
          <div className="mail-title">
            Questions? Email us at
            <br />
            <a href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`} className="mail-link">
              {import.meta.env.VITE_SITE_EMAIL}
            </a>
          </div>
        </aside>

        {/* main content */}
        <div className="bc-tos-content">
          {/* 1. WHAT ARE COOKIES  */}
          <section className="bc-tos-section" id="what-are-cookies">
            <div className="section-header">
              <div className="section-num vlt">01</div>
              <div>
                <div className="section-heading">What Are Cookies?</div>
                <div className="section-desc">A plain-English explanation of how cookies work</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                A <strong>cookie</strong> is a small text file a website saves on your device when
                you visit it. Your browser sends it back on every subsequent request so the site can
                remember who you are. Cookies are not programs — they cannot run code, install
                software, or carry viruses. They are just small pieces of text serving a specific,
                limited purpose.
              </p>
            </div>

            <div className="bc-explainer-grid">
              <div className="ec">
                <div className="ec-icon">
                  <AlarmClock />
                </div>
                <div className="ec-title">Session vs persistent</div>
                <div className="ec-body">
                  <strong>Session</strong> cookies vanish when you close the tab.{' '}
                  <strong>Persistent</strong> cookies stay for a set period (e.g. 30 days) so you
                  remain signed in.
                </div>
              </div>
              <div className="ec">
                <div className="ec-icon grn">
                  <Lock />
                </div>
                <div className="ec-title">HTTP-only cookies</div>
                <div className="ec-body">
                  A security flag preventing JavaScript from reading the cookie — protecting it from
                  cross-site scripting attacks. Used for your <code>refreshToken</code>.
                </div>
              </div>
              <div className="ec">
                <div className="ec-icon">
                  <ShelvingUnit />
                </div>
                <div className="ec-title">localStorage vs sessionStorage</div>
                <div className="ec-body">
                  <strong>localStorage</strong> persists after the browser closes.{' '}
                  <strong>sessionStorage</strong> clears automatically when you close the tab.
                </div>
              </div>
              <div className="ec">
                <div className="ec-icon gld">
                  <Handshake />
                </div>
                <div className="ec-title">First vs third-party</div>
                <div className="ec-body">
                  <strong>First-party</strong> — set by baatchat.online.{' '}
                  <strong>Third-party</strong> — set by external services (e.g. Google) when you use
                  their features.
                </div>
              </div>
              <div className="ec">
                <div className="ec-icon orng">
                  <GitPullRequestClosed />
                </div>
                <div className="ec-title">Your control</div>
                <div className="ec-body">
                  You can accept, reject, or customise optional cookies via our Cookie Settings.
                  Essential cookies cannot be turned off — the app requires them.
                </div>
              </div>
              <div className="ec">
                <div className="ec-icon rd">
                  <Ban />
                </div>
                <div className="ec-title">What we never do</div>
                <div className="ec-body">
                  We never sell cookie data, use ad trackers, or share cookie data with advertisers.
                  BaatChat is completely ad-free.
                </div>
              </div>
            </div>
          </section>

          {/* 2. OVERVIEW TABLE  */}
          <section className="bc-tos-section" id="cookies-at-glance">
            <div className="section-header">
              <div className="section-num vlt">02</div>
              <div>
                <div className="section-heading">All Cookies at a Glance</div>
                <div className="section-desc">Every cookie BaatChat sets on your device</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We collect data in five categories. Each card below is colour-coded to the legend at
                the top of this page so you can identify at a glance what type of data is involved.
              </p>
            </div>

            <div className="bc-overview-table-wrap">
              <table className="overview-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Set by</th>
                    <th>Storage</th>
                    <th>Expiry</th>
                    <th>Opt out?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="cn grn">refreshToken</span>
                    </td>
                    <td>
                      <span className="grn2">
                        <Lock /> Essential
                      </span>
                    </td>
                    <td>BaatChat</td>
                    <td>
                      <span className="stag grn-badge">HTTP-only</span>
                    </td>
                    <td>30 days</td>
                    <td>
                      <span className="rd-note">No</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="cn grn">accessToken</span>
                    </td>
                    <td>
                      <span className="grn2">
                        <Lock /> Essential
                      </span>
                    </td>
                    <td>BaatChat</td>
                    <td>
                      <span className="stag grn-badge">sessionStorage</span>
                    </td>
                    <td>15 min</td>
                    <td>
                      <span className="rd-note">No</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="cn grn">cookiePrefs</span>
                    </td>
                    <td>
                      <span className="grn2">
                        <Lock /> Essential
                      </span>
                    </td>
                    <td>BaatChat</td>
                    <td>
                      <span className="stag grn-badge">localStorage</span>
                    </td>
                    <td>Persistent</td>
                    <td>
                      <span className="rd-note">No</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="cn vlt">loginType</span>
                    </td>
                    <td>
                      <span className="vlt2">
                        <Cog /> Functional
                      </span>
                    </td>
                    <td>BaatChat</td>
                    <td>
                      <span className="stag vlt-badge">localStorage</span>
                    </td>
                    <td>Persistent</td>
                    <td>
                      <span className="grn-note">Yes</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="cn blu">Google cookies</span>
                    </td>
                    <td>
                      <span className="blu2">
                        <GoogleIcon2 /> Google-managed
                      </span>
                    </td>
                    <td>Google</td>
                    <td>
                      <span className="stag blu-note">Cookie</span>
                    </td>
                    <td>Varies</td>
                    <td>
                      <span className="blu-note">Via Google</span>
                    </td>
                  </tr>
                  <tr className="soon">
                    <td>
                      <span className="cn orng">_ga, _ga_*, _gid</span>
                    </td>
                    <td>
                      <span className="orng2">
                        <FileChartColumnIncreasing /> Analytics
                      </span>
                    </td>
                    <td>Google</td>
                    <td>
                      <span className="stag orng-badge">Cookie</span>
                    </td>
                    <td>24h - 2yr</td>
                    <td>
                      <span className="orng-note">Not active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. ESSENTIAL COOKIES   */}
          <section className="bc-tos-section" id="essential-cookies">
            <div className="section-header">
              <div className="section-num grn">03</div>
              <div>
                <div className="section-heading">Essential Cookies</div>
                <div className="section-desc">
                  Cannot be disabled — the app literally cannot work without these
                </div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                <strong>Essential cookies</strong> (also called "strictly necessary") do one job:
                keep you securely signed in. They do not track you across websites, build
                advertising profiles, or collect personal information beyond a cryptographic token.
                Because they are technically required to deliver the service you asked for, they do
                not need your consent under the DPDP Act 2023.
              </p>
            </div>
            <div className="bc-tos-success-box">
              <ShieldCheck />
              <div className="success-box-body">
                <strong>Zero personal data stored in tokens.</strong> Our essential cookies store
                only randomly generated, cryptographically signed strings. They never contain your
                name, email, phone number, or any readable personal information.
              </div>
            </div>

            {/* refreshToken */}
            <div className="bc-cat-block grn">
              <div className="cat-block-header">
                <div className="cat-badge-icon">
                  <RefreshCcw />
                </div>
                <div className="cat-block-info">
                  <div className="cat-block-name">
                    refreshToken <span className="cat-status-badge">Essential</span>{' '}
                    <span className="cat-status-badge">HTTP-only</span>
                  </div>
                  <div className="cat-block-desc">
                    Your long-lived authentication token. Kept as an HTTP-only cookie so JavaScript
                    can never read or steal it. Automatically sent to BaatChat's servers to prove
                    you are signed in and to silently issue fresh access tokens — all without
                    interrupting your conversation.
                  </div>
                  <div className="cat-block-why">
                    <strong>Why essential?</strong> Every API request — loading messages, making
                    calls, fetching contacts — requires authentication. Without the refreshToken,
                    your accessToken expires in 15 minutes and you are logged out permanently. The
                    app becomes completely non-functional.
                  </div>
                  <div className="needed-tag">
                    <Lock /> Required to stay signed in
                  </div>
                </div>
              </div>
              <div className="bc-cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Storage type</td>
                      <td>
                        <span className="stag">HTTP-only Cookie</span> — invisible to JavaScript,
                        sent only over HTTPS
                      </td>
                    </tr>
                    <tr>
                      <td>Expiry</td>
                      <td>
                        <strong>30 days</strong> — sliding window, resets each time you open the app
                      </td>
                    </tr>
                    <tr>
                      <td>Data stored</td>
                      <td>
                        A cryptographically signed, opaque JWT string. Contains hashed user ID,
                        issue time, and expiry only.
                      </td>
                    </tr>
                    <tr>
                      <td>Shared with third parties?</td>
                      <td>
                        <strong className="grn">Never.</strong> Sent only to BaatChat's own API over
                        HTTPS.
                      </td>
                    </tr>
                    <tr>
                      <td>Can you disable it?</td>
                      <td>
                        <strong className="rd">No.</strong> Disabling this logs you out permanently.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* accessToken */}
            <div className="bc-cat-block grn">
              <div className="cat-block-header">
                <div className="cat-badge-icon">
                  <Pointer />
                </div>
                <div className="cat-block-info">
                  <div className="cat-block-name">
                    accessToken <span className="cat-status-badge">Essential</span>{' '}
                    <span className="cat-status-badge">localStorage</span>
                  </div>
                  <div className="cat-block-desc">
                    A short-lived JWT that authorises every API call during your active session —
                    sending messages, making calls, loading contacts. Stored in localStorage, which
                    means it is automatically erased the moment you close the tab. Even if someone
                    copied your device's RAM, it would expire in 15 minutes anyway.
                  </div>
                  <div className="cat-block-why">
                    <strong>Why essential?</strong> Every request BaatChat's frontend makes must be
                    authorised. The accessToken is the credential attached to each request header.
                    It rotates every 15 minutes for security; your refreshToken issues a new one
                    silently in the background so you never notice.
                  </div>
                  <div className="needed-tag">
                    <Lock /> Required to send &amp; receive messages
                  </div>
                </div>
              </div>
              <div className="bc-cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Storage type</td>
                      <td>
                        <span className="stag">localStorage</span> — auto-expired after 15 min of
                        timeline window
                      </td>
                    </tr>
                    <tr>
                      <td>Expiry</td>
                      <td>
                        <strong>15 minutes</strong> — auto-renewed silently by the refreshToken
                      </td>
                    </tr>
                    <tr>
                      <td>Data stored</td>
                      <td>
                        Short-lived JWT with hashed user ID and expiry timestamp. No personal data.
                      </td>
                    </tr>
                    <tr>
                      <td>Shared with third parties?</td>
                      <td>
                        <strong className="grn">Never.</strong> Included only in requests to
                        BaatChat's own API.
                      </td>
                    </tr>
                    <tr>
                      <td>Can you disable it?</td>
                      <td>
                        <strong className="rd">No.</strong> Without it, every API request is
                        rejected with a 401 Unauthorised error.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* cookiePrefs */}
            <div className="bc-cat-block grn">
              <div className="cat-block-header">
                <div className="cat-badge-icon">
                  <SlidersHorizontal />
                </div>
                <div className="cat-block-info">
                  <div className="cat-block-name">
                    cookiePrefs <span className="cat-status-badge">Essential</span>{' '}
                    <span className="cat-status-badge">localStorage</span>
                  </div>
                  <div className="cat-block-desc">
                    Saves your cookie consent choices — which optional cookie categories you have
                    accepted or rejected. Without this cookie, the consent banner would reappear on
                    every single page load asking you the same question repeatedly, which would make
                    the site unusable.
                  </div>
                  <div className="cat-block-why">
                    <strong>Why essential?</strong> Privacy regulations require us to record your
                    consent and not ask for it again unnecessarily. This cookie is the mechanism
                    that stores your decision. Ironically, it's the cookie that lets you{' '}
                    <em>refuse</em> other cookies and have that refusal remembered. It stores no
                    personal data whatsoever.
                  </div>
                  <div className="needed-tag">
                    <Lock /> Required to remember your cookie choices
                  </div>
                </div>
              </div>
              <div className="bc-cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Storage type</td>
                      <td>
                        <span className="stag">localStorage</span> — persists across sessions so the
                        banner doesn't reappear
                      </td>
                    </tr>
                    <tr>
                      <td>Expiry</td>
                      <td>
                        <strong>Persistent</strong> — stored until you clear your browser data or
                        reset preferences
                      </td>
                    </tr>
                    <tr>
                      <td>Data stored</td>
                      <td>
                        A JSON object like{' '}
                        <code className="grn">
                          {'{"functional":true,"analytics":false,"providedAt":1719000000}'}
                        </code>
                        . No personal data.
                      </td>
                    </tr>
                    <tr>
                      <td>Shared with third parties?</td>
                      <td>
                        <strong className="grn">Never.</strong> Read only by BaatChat's own frontend
                        JavaScript. Never sent to any server.
                      </td>
                    </tr>
                    <tr>
                      <td>Can you disable it?</td>
                      <td>
                        <strong className="rd">No.</strong> Without it we have no record of your
                        consent and the banner appears on every visit.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Google cookies note */}
            <div className="bc-tos-note-box">
              <GoogleIcon2 />
              <div className="note-box-body">
                <strong>Google Sign-In also sets its own cookies.</strong> When you choose to log in
                with Google, Google's servers may set their own authentication and security cookies
                (such as <code>SID</code>, <code>HSID</code>, <code>AEC</code>) directly in your
                browser. <strong>BaatChat has no control over these cookies</strong> — we cannot
                read, modify, or delete them. They are governed entirely by{' '}
                <a href="https://policies.google.com/technologies/cookies" target="_blank">
                  Google's Cookie Policy
                </a>
                . If you prefer not to have Google set cookies, use email and password login
                instead.
              </div>
            </div>
          </section>

          {/* 4. FUNCTIONAL */}
          <section className="bc-tos-section" id="functional-cookies">
            <div className="section-header">
              <div className="section-num vlt">04</div>
              <div>
                <div className="section-heading">Functional Cookies</div>
                <div className="section-desc">
                  Optional — improves your experience, but the app works fine without them
                </div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                <strong>Functional cookies</strong> remember your preferences to save you time. They
                do not track your behaviour, build a profile of you, or send any data to third
                parties. You can turn them off in Cookie Settings at any time — the app will
                continue working normally.
              </p>
            </div>

            <div className="bc-cat-block vlt" style={{ marginTop: '18px' }}>
              <div className="cat-block-header">
                <div className="cat-badge-icon">
                  <KeyRound />
                </div>
                <div className="cat-block-info">
                  <div className="cat-block-name">
                    loginType <span className="cat-status-badge">Functional</span>{' '}
                    <span className="cat-status-badge">localStorage</span>
                  </div>
                  <div className="cat-block-desc">
                    Remembers how you signed in — via email/password or Google OAuth — so BaatChat
                    pre-selects the right method on your next visit. The value is simply a short
                    string: <code>"google"</code> or <code>"email"</code>. Nothing more.
                  </div>
                  <div className="cat-block-why">
                    <strong>Why functional and not essential?</strong> Without it, you simply see
                    the default login screen and choose your method manually — the app still works
                    perfectly. We store it only as a UX convenience. It never leaves your device and
                    is never transmitted to any server.
                  </div>
                  <div className="needed-tag">
                    <Cog />
                    Optional — improves login convenience only
                  </div>
                </div>
              </div>
              <div className="bc-cookie-table-wrap">
                <table className="cookie-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Detail</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Storage type</td>
                      <td>
                        <span className="stag">localStorage</span> — persists until cleared via
                        Cookie Settings or browser
                      </td>
                    </tr>
                    <tr>
                      <td>Expiry</td>
                      <td>
                        <strong>Persistent</strong> — stays until you clear browser storage or reset
                        preferences
                      </td>
                    </tr>
                    <tr>
                      <td>Data stored</td>
                      <td>
                        A plain text string: <code className="vlt">"google"</code> or{' '}
                        <code className="vlt">"email"</code>. No personal data.
                      </td>
                    </tr>
                    <tr>
                      <td>Shared with third parties?</td>
                      <td>
                        <strong className="grn">Never.</strong> Read-only by BaatChat's frontend on
                        page load. Never transmitted.
                      </td>
                    </tr>
                    <tr>
                      <td>Can you disable it?</td>
                      <td>
                        <strong className="rd">Yes.</strong> Toggle off in Cookie Settings →
                        Functional. No impact on app functionality.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* 5. ANALYTICS*/}
          <section className="bc-tos-section" id="analytics-cookies">
            <div className="section-header">
              <div className="section-num gld">05</div>
              <div>
                <div className="section-heading">
                  Analytics Cookies <span className="bc-coming-soon-badge">Coming Soon</span>
                </div>
                <div className="section-desc">
                  Google Analytics — not yet active on baatchat.online
                </div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We plan to add <strong>Google Analytics 4 (GA4)</strong> in a future release to
                understand how people use BaatChat — which features are popular, where users
                encounter friction, and how to improve the experience.{' '}
                <strong>These cookies are not currently active.</strong>
              </p>
            </div>

            <div className="bc-tos-warning-box">
              <Clock4 />
              <div className="warn-box-body">
                <strong>Not active yet.</strong> Google Analytics will only be enabled after you
                explicitly consent via the cookie banner. We will update this policy and send a
                notification before it goes live. When enabled: IP anonymisation will be on, data
                retention set to 14 months, and Google Signals will be disabled.
              </div>
            </div>

            <div className="bc-cat-block gld" style={{ opacity: '0.7' }}>
              <div className="cat-block-header">
                <div className="cat-badge-icon">
                  <FileChartColumnIncreasing />
                </div>
                <div className="cat-block-info">
                  <div className="cat-block-name">
                    _ga &amp; _ga_[ID] &amp; _gid{' '}
                    <span className="cat-status-badge">Analytics</span>{' '}
                    <span className="cat-status-badge">Not Active</span>
                  </div>
                  <div className="cat-block-desc">
                    <code>_ga</code> — identifies unique visitors with a random number (2 yr).
                    &nbsp;
                    <code>_ga_[ID]</code> — GA4 session state (2 yr). &nbsp;
                    <code>_gid</code> — daily visitor counter (24 hr). All contain only anonymised
                    random identifiers — no personal data.
                  </div>
                  <div className="cat-block-why">
                    <strong>Future purpose:</strong> Aggregate, anonymised usage insights to help us
                    improve BaatChat. Data will never be linked to individual user accounts.
                  </div>
                  <div className="needed-tag">
                    <Clock4 /> Will require explicit opt-in consent before activation
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6.  YOUR CHOICES */}
          <section className="bc-tos-section" id="your-choices">
            <div className="section-header">
              <div className="section-num vlt">06</div>
              <div>
                <div className="section-heading">Your Choices &amp; Controls</div>
                <div className="section-desc">How to manage or withdraw your cookie consent</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                Your communications are at the core of what BaatChat does. Here is exactly how we
                handle them:
              </p>
            </div>

            <div className="bc-cookie-pref-change-cta">
              <div className="cookie-heading-wrapper">
                <div className="cookie-icon">
                  <Cookie />
                </div>
                <div className="cta-text">
                  <h4>Change your cookie preferences anytime</h4>
                  <p>
                    Toggle functional and Google auth cookies on or off. Essential cookies cannot be
                    disabled.
                  </p>
                </div>
              </div>

              <button
                className="bc-btn bc-btn-primary rect change-pref-cta-btn"
                onClick={() => setShowCookieBanner(true)}
              >
                Open Cookie Settings
              </button>
            </div>

            <div className="section-prose">
              <p>You can also manage cookies through your browser settings:</p>
            </div>

            <ul className="bc-tos-list">
              <li>
                <PanelTop />
                <span>
                  <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site
                  data
                </span>
              </li>
              <li>
                <PanelTop />
                <span>
                  <strong>Firefox:</strong> Preferences → Privacy &amp; Security → Cookies and Site
                  Data
                </span>
              </li>
              <li>
                <PanelTop />
                <span>
                  <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                </span>
              </li>
              <li>
                <Smartphone />
                <span>
                  <strong>Mobile:</strong> Browser Settings → Site Settings → Cookies
                </span>
              </li>
            </ul>

            <div className="bc-tos-warning-box">
              <TriangleAlert />
              <div className="warn-box-body">
                <strong>Blocking essential cookies via your browser</strong> will log you out and
                prevent BaatChat from authenticating you. Use our Cookie Settings panel instead — it
                only blocks optional cookies and leaves the app fully functional.
              </div>
            </div>
          </section>

          {/* 7. POLICY UPDATES  */}
          <section className="bc-tos-section" id="policy-updates">
            <div className="section-header">
              <div className="section-num vlt">07</div>
              <div>
                <div className="section-heading">Policy Updates</div>
                <div className="section-desc">How we tell you when this policy changes</div>
              </div>
            </div>
            <div className="section-prose">
              <p>
                We will update this policy whenever we add or remove cookies — specifically before
                Google Analytics is activated. When we make material changes we will show an updated
                consent banner on your next visit, email registered users at least 14 days in
                advance, and update the "Last updated" date above.
              </p>
            </div>
          </section>

          {/* 8. CONTACT US */}
          <section className="bc-tos-section" id="contact-us">
            <div className="section-header">
              <div className="section-num grn">08</div>
              <div>
                <div className="section-heading">Contact Us</div>
                <div className="section-desc">Questions about our cookie practices</div>
              </div>
            </div>
            <div className="section-prose">
              <p>Questions about this Cookie Policy or your data rights? Reach our Privacy team:</p>
            </div>

            <div className="bc-tos-data-grid">
              <div
                className="data-card dc-identity"
                style={{ borderTopColor: 'var(--lavender-color)' }}
              >
                <div className="data-card-head">
                  <span className="data-card-icon">
                    <Lock />
                  </span>
                  <span className="data-card-title" style={{ color: 'var(--lavender-color)' }}>
                    Privacy &amp; Cookies
                  </span>
                </div>
                <div className="data-card-body">
                  <a
                    href={`mailto:${import.meta.env.VITE_SITE_EMAIL}`}
                    style={{ color: 'var(--lavender-color)' }}
                  >
                    {import.meta.env.VITE_SITE_EMAIL}
                  </a>
                  <br />
                  Response within 30 days
                </div>
              </div>
              <div
                className="data-card dc-content"
                style={{ borderTopColor: 'var(--green-color)' }}
              >
                <div className="data-card-head">
                  <span className="data-card-icon">
                    <MapPinHouseIcon />
                  </span>
                  <span className="data-card-title" style={{ color: 'var(--green-color)' }}>
                    Postal Address
                  </span>
                </div>
                <div className="data-card-body">
                  BaatChat Team <span style={{ color: 'var(--muted-color)' }}>(Sunny Kumar)</span>
                  <br />
                  Data Protection Officer
                  <br />
                  Kolkata, West Bengal — 700 156, India
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiesPolicy;
